'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Profile } from '@/lib/types'

interface Props {
  profiles: Profile[]
  currentUserId: string
}

export default function AdminUsersClient({ profiles: initial, currentUserId }: Props) {
  const [profiles, setProfiles] = useState(initial)
  const [loading, setLoading] = useState<string | null>(null)
  const supabase = createClient()

  async function toggleAdmin(profile: Profile) {
    if (profile.id === currentUserId) return
    setLoading(profile.id)
    const { error } = await supabase
      .from('profiles')
      .update({ is_admin: !profile.is_admin })
      .eq('id', profile.id)

    if (!error) {
      setProfiles(prev =>
        prev.map(p => p.id === profile.id ? { ...p, is_admin: !p.is_admin } : p)
      )
    }
    setLoading(null)
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-white">Gestión de Usuarios</h2>
      <div className="bg-[#0a1628] rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-left text-sm text-white/50">
              <th className="px-4 py-3">Participante</th>
              <th className="px-4 py-3">Rol</th>
              <th className="px-4 py-3">Acción</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map(profile => (
              <tr key={profile.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold text-sm">
                      {profile.display_name[0].toUpperCase()}
                    </div>
                    <span className="text-white text-sm">
                      {profile.display_name}
                      {profile.id === currentUserId && (
                        <span className="ml-2 text-xs text-white/40">(tú)</span>
                      )}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {profile.is_admin ? (
                    <span className="px-2 py-1 rounded-full text-xs bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      Admin
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs bg-white/5 text-white/40 border border-white/10">
                      Jugador
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {profile.id !== currentUserId && (
                    <button
                      onClick={() => toggleAdmin(profile)}
                      disabled={loading === profile.id}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                        profile.is_admin
                          ? 'border-red-500/30 text-red-400 hover:bg-red-500/10'
                          : 'border-amber-500/30 text-amber-400 hover:bg-amber-500/10'
                      } disabled:opacity-50`}
                    >
                      {loading === profile.id
                        ? '...'
                        : profile.is_admin
                        ? 'Quitar admin'
                        : 'Hacer admin'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
