'use client'

import { useState } from 'react'
import { Match, Prediction, Phase, PHASE_LABELS } from '@/lib/types'
import MatchCard from './MatchCard'

interface PredictionsClientProps {
  matches: Match[]
  predictions: Prediction[]
  userId: string
}

export default function PredictionsClient({
  matches,
  predictions,
  userId,
}: PredictionsClientProps) {
  const predictionMap = new Map<number, Prediction>(
    predictions.map((p) => [p.match_id, p])
  )

  // Determine which phases have matches, preserving logical order
  const phaseOrder: Phase[] = ['group', 'r32', 'r16', 'qf', 'sf', '3rd', 'final']
  const presentPhases = phaseOrder.filter((phase) =>
    matches.some((m) => m.phase === phase)
  )

  const [activePhase, setActivePhase] = useState<Phase>(presentPhases[0] ?? 'group')

  const filteredMatches = matches.filter((m) => m.phase === activePhase)

  return (
    <div className="min-h-screen bg-[#050d1a] text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">Mis Predicciones</h1>
          <p className="text-gray-400 text-sm">
            {predictions.length} predicción{predictions.length !== 1 ? 'es' : ''} guardada
            {predictions.length !== 1 ? 's' : ''} de {matches.length} partidos
          </p>
        </div>

        {/* Phase Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {presentPhases.map((phase) => {
            const count = matches.filter((m) => m.phase === phase).length
            const predicted = matches
              .filter((m) => m.phase === phase)
              .filter((m) => predictionMap.has(m.id)).length
            const isActive = activePhase === phase

            return (
              <button
                key={phase}
                onClick={() => setActivePhase(phase)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                  isActive
                    ? 'bg-[#22c55e]/20 border-[#22c55e] text-[#22c55e]'
                    : 'bg-[#0a1628] border-[#1e3a5f] text-gray-400 hover:border-[#22c55e]/50 hover:text-gray-200'
                }`}
              >
                {PHASE_LABELS[phase]}
                <span
                  className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-[#22c55e]/30 text-[#22c55e]'
                      : 'bg-[#1e3a5f] text-gray-500'
                  }`}
                >
                  {predicted}/{count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Match Cards */}
        <div className="space-y-4">
          {filteredMatches.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No hay partidos en esta fase.</p>
          ) : (
            filteredMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                prediction={predictionMap.get(match.id) ?? null}
                userId={userId}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
