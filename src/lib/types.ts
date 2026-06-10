export type Phase = 'group' | 'r32' | 'r16' | 'qf' | 'sf' | '3rd' | 'final'

export interface Profile {
  id: string
  display_name: string
  avatar_url: string | null
  is_admin: boolean
  created_at: string
}

export interface Match {
  id: number
  match_number: number
  phase: Phase
  group_name: string | null
  team_home: string
  team_away: string
  flag_home: string | null
  flag_away: string | null
  match_date: string
  venue: string | null
  home_score: number | null
  away_score: number | null
  is_finished: boolean
}

export interface Prediction {
  id: number
  user_id: string
  match_id: number
  home_score: number
  away_score: number
  points_earned: number
  created_at: string
  updated_at: string
}

export interface TournamentPrediction {
  id: number
  user_id: string
  champion: string | null
  runner_up: string | null
  third_place: string | null
  champion_points: number
  runner_up_points: number
  third_place_points: number
}

export interface LeaderboardEntry {
  id: string
  display_name: string
  avatar_url: string | null
  total_points: number
  match_points: number
  predictions_count: number
  rank: number
}

export const PHASE_LABELS: Record<Phase, string> = {
  group: 'Fase de Grupos',
  r32: 'Ronda de 32',
  r16: 'Octavos de Final',
  qf: 'Cuartos de Final',
  sf: 'Semifinales',
  '3rd': 'Tercer Puesto',
  final: 'Final',
}

export function isMatchLocked(matchDate: string): boolean {
  return new Date(matchDate).getTime() - Date.now() <= 10 * 60 * 1000
}

export function calculatePoints(
  homePred: number, awayPred: number,
  homeReal: number, awayReal: number
): number {
  let pts = 0
  if (homePred === homeReal) pts += 1
  if (awayPred === awayReal) pts += 1
  if (homePred === homeReal && awayPred === awayReal) pts += 2
  const predWinner = homePred > awayPred ? 1 : homePred < awayPred ? -1 : 0
  const realWinner = homeReal > awayReal ? 1 : homeReal < awayReal ? -1 : 0
  if (predWinner === realWinner) pts += 3
  return pts
}
