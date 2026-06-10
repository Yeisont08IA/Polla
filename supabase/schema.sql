-- =============================================
-- POLLA MUNDIAL 2026 - Database Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- Profiles (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  display_name text not null,
  avatar_url text,
  is_admin boolean default false,
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Trigger: auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Matches
create table public.matches (
  id serial primary key,
  match_number int not null,
  phase text not null, -- 'group', 'r32', 'r16', 'qf', 'sf', '3rd', 'final'
  group_name text, -- 'A', 'B', ... only for group stage
  team_home text not null,
  team_away text not null,
  flag_home text, -- emoji or code
  flag_away text,
  match_date timestamptz not null,
  venue text,
  home_score int, -- null until result entered
  away_score int,
  is_finished boolean default false,
  created_at timestamptz default now()
);
alter table public.matches enable row level security;
create policy "Matches viewable by everyone" on public.matches for select using (true);
create policy "Only admins can insert matches" on public.matches for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);
create policy "Only admins can update matches" on public.matches for update using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);

-- Predictions (one per user per match)
create table public.predictions (
  id serial primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  match_id int references public.matches(id) on delete cascade not null,
  home_score int not null,
  away_score int not null,
  points_earned int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, match_id)
);
alter table public.predictions enable row level security;
-- Users can only see others' predictions after match locks (10 min before)
create policy "Users can read locked predictions" on public.predictions for select using (
  auth.uid() = user_id
  or (select match_date from public.matches where id = match_id) <= now() + interval '10 minutes'
);
create policy "Users can insert own predictions" on public.predictions for insert with check (
  auth.uid() = user_id
  and (select match_date from public.matches where id = match_id) > now() + interval '10 minutes'
);
create policy "Users can update own predictions before lock" on public.predictions for update using (
  auth.uid() = user_id
  and (select match_date from public.matches where id = match_id) > now() + interval '10 minutes'
);

-- Tournament predictions (champion, runner-up, 3rd place)
create table public.tournament_predictions (
  id serial primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,
  champion text,
  runner_up text,
  third_place text,
  champion_points int default 0,
  runner_up_points int default 0,
  third_place_points int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.tournament_predictions enable row level security;
create policy "Tournament preds viewable by everyone" on public.tournament_predictions for select using (true);
create policy "Users can manage own tournament pred" on public.tournament_predictions for insert with check (auth.uid() = user_id);
create policy "Users can update own tournament pred" on public.tournament_predictions for update using (auth.uid() = user_id);

-- Function: calculate points for a prediction
create or replace function public.calculate_points(
  p_home_pred int, p_away_pred int,
  p_home_real int, p_away_real int
) returns int as $$
declare
  pts int := 0;
  pred_winner int; -- -1 away, 0 draw, 1 home
  real_winner int;
begin
  if p_home_real is null or p_away_real is null then return 0; end if;

  -- Goals per team: +1 each
  if p_home_pred = p_home_real then pts := pts + 1; end if;
  if p_away_pred = p_away_real then pts := pts + 1; end if;

  -- Exact score: +2
  if p_home_pred = p_home_real and p_away_pred = p_away_real then pts := pts + 2; end if;

  -- Winner: +3
  pred_winner := case when p_home_pred > p_away_pred then 1 when p_home_pred < p_away_pred then -1 else 0 end;
  real_winner := case when p_home_real > p_away_real then 1 when p_home_real < p_away_real then -1 else 0 end;
  if pred_winner = real_winner then pts := pts + 3; end if;

  return pts;
end;
$$ language plpgsql;

-- Function: update points when a match result is saved
create or replace function public.update_match_points()
returns trigger as $$
begin
  if new.home_score is not null and new.away_score is not null then
    update public.predictions
    set points_earned = public.calculate_points(home_score, away_score, new.home_score, new.away_score)
    where match_id = new.id;
  end if;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_match_result_updated
  after insert or update of home_score, away_score on public.matches
  for each row execute procedure public.update_match_points();

-- View: leaderboard
create or replace view public.leaderboard as
select
  p.id,
  p.display_name,
  p.avatar_url,
  coalesce(sum(pr.points_earned), 0) +
  coalesce(tp.champion_points, 0) +
  coalesce(tp.runner_up_points, 0) +
  coalesce(tp.third_place_points, 0) as total_points,
  coalesce(sum(pr.points_earned), 0) as match_points,
  count(pr.id) as predictions_count,
  rank() over (order by (
    coalesce(sum(pr.points_earned), 0) +
    coalesce(tp.champion_points, 0) +
    coalesce(tp.runner_up_points, 0) +
    coalesce(tp.third_place_points, 0)
  ) desc) as rank
from public.profiles p
left join public.predictions pr on p.id = pr.user_id
left join public.tournament_predictions tp on p.id = tp.user_id
group by p.id, p.display_name, p.avatar_url, tp.champion_points, tp.runner_up_points, tp.third_place_points;
