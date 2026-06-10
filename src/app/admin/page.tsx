import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Match, Profile } from '@/lib/types'
import AdminResultsClient from '@/components/AdminResultsClient'
import AdminUsersClient from '@/components/AdminUsersClient'

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) {
    redirect('/')
  }

  const oneHourFromNow = new Date(Date.now() + 60 * 60 * 1000).toISOString()

  const { data: pendingMatches } = await supabase
    .from('matches')
    .select('*')
    .eq('is_finished', false)
    .lt('match_date', oneHourFromNow)
    .order('match_date', { ascending: false })
    .limit(20)

  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .order('display_name', { ascending: true })

  return (
    <main className="min-h-screen bg-[#050d1a] text-white">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
        <h1 className="text-3xl font-bold text-white">Panel de Administración</h1>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-amber-400">Ingresar Resultados</h2>
          <AdminResultsClient matches={(pendingMatches as Match[]) ?? []} />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-amber-400">Gestión de Usuarios</h2>
          <AdminUsersClient
            profiles={(profiles as Profile[]) ?? []}
            currentUserId={user.id}
          />
        </section>
      </div>
    </main>
  )
}
