'use client'

import { useState } from 'react'
import type { Match } from '@/lib/types'
import { getFlag } from '@/lib/types'

interface Props {
  matches: Match[]
}

interface MatchState {
  home_score: string
  away_score: string
  is_finished: boolean
  saving: boolean
  success: boolean
  error: string | null
}

export default function AdminResultsClient({ matches }: Props) {
  const [states, setStates] = useState<Record<number, MatchState>>(() => {
    const initial: Record<number, MatchState> = {}
    for (const m of matches) {
      initial[m.id] = {
        home_score: m.home_score != null ? String(m.home_score) : '',
        away_score: m.away_score != null ? String(m.away_score) : '',
        is_finished: m.is_finished,
        saving: false,
        success: false,
        error: null,
      }
    }
    return initial
  })

  function update(id: number, patch: Partial<MatchState>) {
    setStates((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }))
  }

  async function save(match: Match) {
    const s = states[match.id]
    if (s.home_score === '' || s.away_score === '') {
      update(match.id, { error: 'Ingresa ambos marcadores.' })
      return
    }
    update(match.id, { saving: true, error: null, success: false })
    try {
      const res = await fetch(`/api/admin/matches/${match.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          home_score: Number(s.home_score),
          away_score: Number(s.away_score),
          is_finished: s.is_finished,
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        update(match.id, { saving: false, error: json.error ?? 'Error al guardar.' })
      } else {
        update(match.id, { saving: false, success: true, error: null })
      }
    } catch {
      update(match.id, { saving: false, error: 'Error de red.' })
    }
  }

  if (matches.length === 0) {
    return (
      <p className="text-gray-400 text-sm">No hay partidos pendientes de resultado por ahora.</p>
    )
  }

  return (
    <div className="space-y-4">
      {matches.map((match) => {
        const s = states[match.id]
        const dateStr = new Date(match.match_date).toLocaleString('es-CO', {
          dateStyle: 'medium',
          timeStyle: 'short',
        })
        return (
          <div
            key={match.id}
            className="bg-[#0b1a2e] border border-white/10 rounded-xl p-4 space-y-3"
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  {match.phase}
                  {match.group_name ? ` · Grupo ${match.group_name}` : ''} · Partido #{match.match_number}
                </p>
                <p className="text-lg font-semibold mt-0.5">
                  <span className="mr-1">{match.flag_home ?? getFlag(match.team_home)}</span>
                  {match.team_home}
                  <span className="mx-2 text-gray-400">vs</span>
                  {match.team_away}
                  <span className="ml-1">{match.flag_away ?? getFlag(match.team_away)}</span>
                </p>
                <p className="text-xs text-gray-400">{dateStr}{match.venue ? ` · ${match.venue}` : ''}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-300 w-20 truncate" title={match.team_home}>
                  {match.team_home}
                </label>
                <input
                  type="number"
                  min={0}
                  value={s.home_score}
                  onChange={(e) => update(match.id, { home_score: e.target.value, success: false })}
                  className="w-16 bg-[#0f2035] border border-white/20 rounded-lg px-3 py-1.5 text-center text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <span className="text-gray-500">–</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  value={s.away_score}
                  onChange={(e) => update(match.id, { away_score: e.target.value, success: false })}
                  className="w-16 bg-[#0f2035] border border-white/20 rounded-lg px-3 py-1.5 text-center text-white focus:outline-none focus:border-amber-400"
                />
                <label className="text-sm text-gray-300 w-20 truncate" title={match.team_away}>
                  {match.team_away}
                </label>
              </div>

              <label className="flex items-center gap-2 cursor-pointer ml-2">
                <input
                  type="checkbox"
                  checked={s.is_finished}
                  onChange={(e) => update(match.id, { is_finished: e.target.checked, success: false })}
                  className="w-4 h-4 accent-amber-400"
                />
                <span className="text-sm text-gray-300">Marcar como finalizado</span>
              </label>

              <button
                onClick={() => save(match)}
                disabled={s.saving}
                className="ml-auto px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-semibold text-sm transition-colors"
              >
                {s.saving ? 'Guardando…' : 'Guardar resultado'}
              </button>
            </div>

            {s.success && (
              <p className="text-green-400 text-sm">Resultado guardado correctamente.</p>
            )}
            {s.error && (
              <p className="text-red-400 text-sm">{s.error}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}
