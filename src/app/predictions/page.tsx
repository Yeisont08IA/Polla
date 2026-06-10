import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PredictionsClient from '@/components/PredictionsClient'
import { Match, Prediction } from '@/lib/types'

export default async function PredictionsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: matches } = await supabase
    .from('matches')
    .select('*')
    .order('match_date', { ascending: true })

  const { data: predictions } = await supabase
    .from('predictions')
    .select('*')
    .eq('user_id', user.id)

  return (
    <PredictionsClient
      matches={(matches as Match[]) ?? []}
      predictions={(predictions as Prediction[]) ?? []}
      userId={user.id}
    />
  )
}
