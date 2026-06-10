import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export async function Navbar() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let profile: { display_name: string | null; is_admin: boolean } | null = null

  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('display_name, is_admin')
      .eq('id', user.id)
      .single()
    profile = data
  }

  return (
    <nav className="bg-[#0a1628] border-b border-white/10 px-4 py-3 flex items-center justify-between">
      {/* Left: Brand */}
      <Link
        href="/"
        className="text-[#f0f4ff] font-bold text-lg hover:text-[#22c55e] transition-colors"
      >
        ⚽ Polla Mundial 2026
      </Link>

      {/* Center: Nav links */}
      <div className="flex items-center gap-6">
        <Link
          href="/predictions"
          className="text-[#f0f4ff]/80 hover:text-[#22c55e] transition-colors text-sm font-medium"
        >
          Predicciones
        </Link>
        <Link
          href="/rules"
          className="text-[#f0f4ff]/80 hover:text-[#22c55e] transition-colors text-sm font-medium"
        >
          📋 Reglas
        </Link>
        <Link
          href="/leaderboard"
          className="text-[#f0f4ff]/80 hover:text-[#22c55e] transition-colors text-sm font-medium"
        >
          Clasificación
        </Link>
        <Link
          href="/tournament"
          className="text-[#f0f4ff]/80 hover:text-[#22c55e] transition-colors text-sm font-medium"
        >
          🏆 Torneo
        </Link>
        {profile?.is_admin && (
          <Link
            href="/admin"
            className="text-[#f59e0b] hover:text-[#f59e0b]/80 transition-colors text-sm font-medium"
          >
            Admin
          </Link>
        )}
      </div>

      {/* Right: Auth */}
      <div className="flex items-center gap-4">
        {user && profile ? (
          <>
            <span className="text-[#f0f4ff]/80 text-sm">
              {profile.display_name ?? user.email}
            </span>
            <form action="/auth/signout" method="POST">
              <button
                type="submit"
                className="text-sm bg-white/10 hover:bg-white/20 text-[#f0f4ff] px-3 py-1.5 rounded-lg transition-colors"
              >
                Cerrar sesión
              </button>
            </form>
          </>
        ) : (
          <Link
            href="/login"
            className="text-sm bg-[#22c55e] hover:bg-[#16a34a] text-white px-4 py-1.5 rounded-lg font-medium transition-colors"
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  )
}
