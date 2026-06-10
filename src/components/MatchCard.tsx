'use client'

import { useState, useCallback } from 'react'
import { Match, Prediction, isMatchLocked } from '@/lib/types'
import { createClient } from '@/lib/supabase/client'

interface MatchCardProps {
  match: Match
  prediction: Prediction | null
  userId: string
}

function formatMatchDate(dateStr: string): string {
  // Display in Colombia time (UTC-5)
  const date = new Date(dateStr)
  // Shift to UTC-5
  const colombiaOffset = -5 * 60
  const utcMinutes = date.getUTCHours() * 60 + date.getUTCMinutes()
  const colombiaMinutes = utcMinutes + colombiaOffset
  let day = date.getUTCDate()
  let month = date.getUTCMonth()
  let year = date.getUTCFullYear()
  let totalMinutes = colombiaMinutes
  if (totalMinutes < 0) {
    totalMinutes += 24 * 60
    day -= 1
    // Simple day rollback (doesn't handle month boundary for display purposes)
  }
  const hours = Math.floor(totalMinutes / 60) % 24
  const minutes = totalMinutes % 60
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const hours12 = hours % 12 === 0 ? 12 : hours % 12

  const weekdays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

  // Reconstruct date for weekday calculation
  const displayDate = new Date(Date.UTC(year, month, day))
  const weekday = weekdays[displayDate.getUTCDay()]
  const monthName = months[month]

  return `${weekday} ${day} ${monthName} · ${hours12}:${String(minutes).padStart(2, '0')} ${ampm}`
}

function getResultBorderClass(match: Match, prediction: Prediction | null): string {
  if (!prediction || !match.is_finished) return 'border-[#1e3a5f]'
  if (match.home_score === null || match.away_score === null) return 'border-[#1e3a5f]'

  // Exact score
  if (
    prediction.home_score === match.home_score &&
    prediction.away_score === match.away_score
  ) {
    return 'border-[#f59e0b]'
  }

  // Correct winner/draw
  const actualResult =
    match.home_score > match.away_score
      ? 'home'
      : match.home_score < match.away_score
      ? 'away'
      : 'draw'
  const predictedResult =
    prediction.home_score > prediction.away_score
      ? 'home'
      : prediction.home_score < prediction.away_score
      ? 'away'
      : 'draw'

  if (actualResult === predictedResult) {
    return 'border-[#22c55e]'
  }

  return 'border-[#1e3a5f]'
}

export default function MatchCard({ match, prediction, userId }: MatchCardProps) {
  const locked = isMatchLocked(match.match_date)
  const hasResult = match.is_finished && match.home_score !== null && match.away_score !== null

  const [homeInput, setHomeInput] = useState<string>(
    prediction ? String(prediction.home_score) : ''
  )
  const [awayInput, setAwayInput] = useState<string>(
    prediction ? String(prediction.away_score) : ''
  )
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState(false)
  const [showBreakdown, setShowBreakdown] = useState(false)

  const savePrediction = useCallback(
    async (home: string, away: string) => {
      const homeNum = parseInt(home, 10)
      const awayNum = parseInt(away, 10)
      if (isNaN(homeNum) || isNaN(awayNum)) return
      if (homeNum < 0 || homeNum > 20 || awayNum < 0 || awayNum > 20) return

      setSaving(true)
      setSaved(false)
      setSaveError(false)

      const supabase = createClient()
      const { error } = await supabase.from('predictions').upsert(
        {
          user_id: userId,
          match_id: match.id,
          home_score: homeNum,
          away_score: awayNum,
        },
        { onConflict: 'user_id,match_id' }
      )

      setSaving(false)
      if (error) {
        setSaveError(true)
        setTimeout(() => setSaveError(false), 3000)
      } else {
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
      }
    },
    [match.id, userId]
  )

  const borderClass = getResultBorderClass(match, prediction)

  return (
    <div
      className={`relative bg-[#0a1628] rounded-xl border-2 ${borderClass} p-5 transition-all`}
      onMouseEnter={() => setShowBreakdown(true)}
      onMouseLeave={() => setShowBreakdown(false)}
    >
      {/* Top row: date, venue, status badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs text-gray-400">{formatMatchDate(match.match_date)}</div>
        <div className="flex items-center gap-2">
          {match.venue && (
            <span className="text-xs text-gray-500 hidden sm:inline">{match.venue}</span>
          )}
          {locked && !hasResult && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
              En curso / Por jugar
            </span>
          )}
          {hasResult && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
              Finalizado
            </span>
          )}
        </div>
      </div>

      {/* Teams row */}
      <div className="flex items-center justify-between gap-4">
        {/* Home team */}
        <div className="flex flex-col items-center gap-1 flex-1 text-center">
          {match.flag_home && (
            <span className="text-3xl leading-none">{match.flag_home}</span>
          )}
          <span className="text-sm font-semibold text-white">{match.team_home}</span>
        </div>

        {/* Center: result or prediction or VS */}
        <div className="flex flex-col items-center gap-2 min-w-[100px]">
          {hasResult ? (
            // Show actual result prominently
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-white">{match.home_score}</span>
              <span className="text-gray-500 text-lg">-</span>
              <span className="text-3xl font-bold text-white">{match.away_score}</span>
            </div>
          ) : (
            <span className="text-gray-600 text-lg font-bold">VS</span>
          )}

          {/* Points earned badge */}
          {hasResult && prediction && (
            <div
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                prediction.points_earned > 0
                  ? 'bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30'
                  : 'bg-gray-700/40 text-gray-500 border border-gray-700'
              }`}
            >
              +{prediction.points_earned} pts
            </div>
          )}
        </div>

        {/* Away team */}
        <div className="flex flex-col items-center gap-1 flex-1 text-center">
          {match.flag_away && (
            <span className="text-3xl leading-none">{match.flag_away}</span>
          )}
          <span className="text-sm font-semibold text-white">{match.team_away}</span>
        </div>
      </div>

      {/* Prediction section */}
      <div className="mt-5 pt-4 border-t border-[#1e3a5f]">
        {!locked ? (
          // Editable inputs
          <div className="flex items-center justify-center gap-4">
            <span className="text-xs text-gray-400 mr-1">Mi predicción:</span>
            <input
              type="number"
              min={0}
              max={20}
              value={homeInput}
              onChange={(e) => setHomeInput(e.target.value)}
              onBlur={() => savePrediction(homeInput, awayInput)}
              placeholder="0"
              className="w-14 h-10 bg-[#050d1a] border border-[#1e3a5f] rounded-lg text-center text-white text-lg font-bold focus:border-[#22c55e] focus:outline-none transition-colors"
            />
            <span className="text-gray-500 font-bold">-</span>
            <input
              type="number"
              min={0}
              max={20}
              value={awayInput}
              onChange={(e) => setAwayInput(e.target.value)}
              onBlur={() => savePrediction(homeInput, awayInput)}
              placeholder="0"
              className="w-14 h-10 bg-[#050d1a] border border-[#1e3a5f] rounded-lg text-center text-white text-lg font-bold focus:border-[#22c55e] focus:outline-none transition-colors"
            />
            <div className="ml-2 w-20 text-right">
              {saving && <span className="text-xs text-gray-400 animate-pulse">Guardando…</span>}
              {saved && !saving && (
                <span className="text-xs text-[#22c55e]">Guardado ✓</span>
              )}
              {saveError && (
                <span className="text-xs text-red-400">Error al guardar</span>
              )}
            </div>
          </div>
        ) : (
          // Locked: show prediction read-only
          <div className="flex items-center justify-center gap-3">
            <span className="text-xs text-gray-500">Tu predicción:</span>
            {prediction ? (
              <div
                className={`flex items-center gap-2 ${
                  hasResult ? 'opacity-60' : 'opacity-90'
                }`}
              >
                <span className="w-10 h-8 flex items-center justify-center bg-[#050d1a] border border-[#1e3a5f] rounded text-white font-bold text-base">
                  {prediction.home_score}
                </span>
                <span className="text-gray-500">-</span>
                <span className="w-10 h-8 flex items-center justify-center bg-[#050d1a] border border-[#1e3a5f] rounded text-white font-bold text-base">
                  {prediction.away_score}
                </span>
              </div>
            ) : (
              <span className="text-xs text-gray-600 italic">Sin predicción</span>
            )}
          </div>
        )}
      </div>

      {/* Points breakdown tooltip on hover */}
      {showBreakdown && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10 bg-[#0a1628] border border-[#1e3a5f] rounded-lg px-3 py-2 text-xs text-gray-300 whitespace-nowrap shadow-xl pointer-events-none">
          <div className="font-semibold text-white mb-1">Puntos por partido</div>
          <div className="flex flex-col gap-0.5">
            <span>
              <span className="text-[#22c55e] font-bold">+3</span> Ganador / Empate correcto
            </span>
            <span>
              <span className="text-[#f59e0b] font-bold">+2</span> Resultado exacto
            </span>
            <span>
              <span className="text-blue-400 font-bold">+1</span> Goles local acertados
            </span>
            <span>
              <span className="text-blue-400 font-bold">+1</span> Goles visitante acertados
            </span>
          </div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1e3a5f]" />
        </div>
      )}
    </div>
  )
}
