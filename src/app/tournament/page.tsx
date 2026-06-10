import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { TournamentClient } from '@/components/TournamentClient'

export default async function TournamentPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: existing } = await supabase
    .from('tournament_predictions')
    .select('*')
    .eq('user_id', user.id)
    .single()

  const { data: finalMatch } = await supabase
    .from('matches')
    .select('is_finished')
    .eq('match_number', 104)
    .single()

  return (
    <TournamentClient
      existingPrediction={existing}
      userId={user.id}
      isLocked={finalMatch?.is_finished ?? false}
    />
  )
}
