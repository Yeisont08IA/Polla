import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  const body = await request.json()
  const { home_score, away_score, is_finished } = body

  const { error } = await supabase
    .from('matches')
    .update({ home_score, away_score, is_finished })
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Update tournament predictions for final and 3rd place matches
  const { data: match } = await supabase
    .from('matches')
    .select('match_number')
    .eq('id', id)
    .single()

  if (is_finished && match && home_score != null && away_score != null) {
    const winner = home_score > away_score ? body.team_home : away_score > home_score ? body.team_away : null
    const loser = home_score > away_score ? body.team_away : away_score > home_score ? body.team_home : null

    if (match.match_number === 104 && winner && loser) {
      // Final: champion and runner-up
      await supabase.from('tournament_predictions')
        .update({ champion_points: 18 })
        .eq('champion', winner)
      await supabase.from('tournament_predictions')
        .update({ runner_up_points: 15 })
        .eq('runner_up', loser)
    }
    if (match.match_number === 103 && winner) {
      // 3rd place
      await supabase.from('tournament_predictions')
        .update({ third_place_points: 12 })
        .eq('third_place', winner)
    }
  }

  return NextResponse.json({ success: true })
}
