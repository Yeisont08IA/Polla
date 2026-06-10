'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { TEAM_FLAGS } from '@/lib/types'

const TEAMS = [
  'México', 'Ecuador', 'Estados Unidos', 'Canadá',
  'Argentina', 'Marruecos', 'Albania', 'Ucrania',
  'España', 'Brasil', 'Japón', 'Sudáfrica',
  'Francia', 'Colombia', 'Alemania', 'Corea del Sur',
  'Portugal', 'Arabia Saudita', 'Senegal', 'Polonia',
  'Inglaterra', 'Países Bajos', 'Irán', 'Camerún',
  'Bélgica', 'Venezuela', 'Australia', 'Ghana',
  'Uruguay', 'Suiza', 'República Checa', 'Nigeria',
  'Italia', 'Perú', 'Chile',
  'Croacia', 'Turquía', 'Serbia', 'Dinamarca',
  'China', 'Escocia', 'Paraguay',
  'Costa Rica', 'Nueva Zelanda', 'Kenia', 'Bolivia',
].sort()

interface TournamentPrediction {
  champion: string | null
  runner_up: string | null
  third_place: string | null
  champion_points: number
  runner_up_points: number
  third_place_points: number
}

interface Props {
  existingPrediction: TournamentPrediction | null
  userId: string
  isLocked: boolean
}

export function TournamentClient({ existingPrediction, userId, isLocked }: Props) {
  const [champion, setChampion] = useState(existingPrediction?.champion ?? '')
  const [runnerUp, setRunnerUp] = useState(existingPrediction?.runner_up ?? '')
  const [thirdPlace, setThirdPlace] = useState(existingPrediction?.third_place ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  const totalPoints = (existingPrediction?.champion_points ?? 0) +
    (existingPrediction?.runner_up_points ?? 0) +
    (existingPrediction?.third_place_points ?? 0)

  async function handleSave() {
    if (!champion) { setError('Selecciona un campeón'); return }
    if (champion === runnerUp || champion === thirdPlace || (runnerUp && runnerUp === thirdPlace)) {
      setError('No puedes seleccionar el mismo equipo en varias posiciones')
      return
    }
    setSaving(true)
    setError('')
    const { error: err } = await supabase
      .from('tournament_predictions')
      .upsert({
        user_id: userId,
        champion: champion || null,
        runner_up: runnerUp || null,
        third_place: thirdPlace || null,
      }, { onConflict: 'user_id' })

    if (err) setError(err.message)
    else { setSaved(true); setTimeout(() => setSaved(false), 3000) }
    setSaving(false)
  }

  const positions = [
    { label: 'Campeón', emoji: '🏆', pts: 18, value: champion, setValue: isLocked ? undefined : setChampion, earned: existingPrediction?.champion_points ?? 0 },
    { label: 'Subcampeón', emoji: '🥈', pts: 15, value: runnerUp, setValue: isLocked ? undefined : setRunnerUp, earned: existingPrediction?.runner_up_points ?? 0 },
    { label: 'Tercer Puesto', emoji: '🥉', pts: 12, value: thirdPlace, setValue: isLocked ? undefined : setThirdPlace, earned: existingPrediction?.third_place_points ?? 0 },
  ]

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Predicción de Torneo</h1>
        <p className="text-white/50">¿Quién ganará el Mundial 2026?</p>
        {totalPoints > 0 && (
          <div className="mt-3 inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5">
            <span className="text-amber-400 font-bold">{totalPoints} pts ganados</span>
          </div>
        )}
      </div>

      <div className="grid gap-4 mb-6">
        {positions.map(({ label, emoji, pts, value, setValue, earned }) => (
          <div key={label} className={`bg-[#0a1628] rounded-xl p-5 border ${earned > 0 ? 'border-amber-500/40' : 'border-white/10'}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{emoji}</span>
                <span className="text-white font-semibold">{label}</span>
              </div>
              <div className="flex items-center gap-2">
                {earned > 0 && (
                  <span className="text-amber-400 font-bold text-sm">+{earned} pts ✓</span>
                )}
                <span className="text-white/30 text-sm">{pts} pts disponibles</span>
              </div>
            </div>
            {setValue ? (
              <select
                value={value}
                onChange={e => setValue(e.target.value)}
                className="w-full bg-[#050d1a] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-green-500/50"
              >
                <option value="">— Selecciona un equipo —</option>
                {TEAMS.map(t => (
                  <option key={t} value={t}>{TEAM_FLAGS[t] ?? '🏳️'} {t}</option>
                ))}
              </select>
            ) : (
              <div className="bg-[#050d1a] border border-white/10 rounded-lg px-3 py-2.5 text-white/70 text-sm">
                {value ? `${TEAM_FLAGS[value] ?? '🏳️'} ${value}` : '—'}
              </div>
            )}
          </div>
        ))}
      </div>

      {error && (
        <p className="text-red-400 text-sm mb-4 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">{error}</p>
      )}

      {!isLocked ? (
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50"
        >
          {saving ? 'Guardando...' : saved ? '✓ Guardado' : 'Guardar predicción'}
        </button>
      ) : (
        <p className="text-center text-white/40 text-sm">El torneo ha finalizado. No se pueden editar las predicciones.</p>
      )}

      <div className="mt-6 bg-[#0a1628] rounded-xl p-4 border border-white/5">
        <p className="text-white/40 text-xs text-center">
          Campeón 🏆 {18} pts · Subcampeón 🥈 {15} pts · Tercer Puesto 🥉 {12} pts
        </p>
      </div>
    </div>
  )
}
