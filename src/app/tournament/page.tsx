import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { TournamentClient } from '@/components/TournamentClient'

// Deadline: 5 days after World Cup start (June 11, 2026) = June 16 23:59 Colombia (UTC-5) = June 17 04:59 UTC
const TOURNAMENT_DEADLINE = new Date('2026-06-17T04:59:00Z')

export default async function TournamentPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: existing } = await supabase
    .from('tournament_predictions')
    .select('*')
    .eq('user_id', user.id)
    .single()

  const isLocked = new Date() > TOURNAMENT_DEADLINE

  return (
    <TournamentClient
      existingPrediction={existing}
      userId={user.id}
      isLocked={isLocked}
      deadline={TOURNAMENT_DEADLINE.toISOString()}
    />
  )
}
