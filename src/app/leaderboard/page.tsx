import { createClient } from '@/lib/supabase/server'
import { LeaderboardEntry } from '@/lib/types'

export const revalidate = 60

export default async function LeaderboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: entries } = await supabase
    .from('leaderboard')
    .select('*')
    .order('rank', { ascending: true })

  const leaderboard = (entries as LeaderboardEntry[]) ?? []

  // Stats
  const totalPredictions = leaderboard.reduce((sum, e) => sum + e.predictions_count, 0)

  // Count finished matches (matches with is_finished = true)
  const { count: finishedMatches } = await supabase
    .from('matches')
    .select('*', { count: 'exact', head: true })
    .eq('is_finished', true)

  const medals: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' }

  function getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }

  return (
    <div className="min-h-screen bg-[#050d1a] text-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">Tabla de Posiciones</h1>
          <p className="text-gray-400 text-sm">Polla Mundial 2026</p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[#0a1628] rounded-xl border border-[#1e3a5f] p-4">
            <div className="text-2xl font-bold text-[#22c55e]">{finishedMatches ?? 0}</div>
            <div className="text-xs text-gray-400 mt-1">Partidos jugados</div>
          </div>
          <div className="bg-[#0a1628] rounded-xl border border-[#1e3a5f] p-4">
            <div className="text-2xl font-bold text-[#f59e0b]">{totalPredictions}</div>
            <div className="text-xs text-gray-400 mt-1">Predicciones totales</div>
          </div>
        </div>

        {/* Leaderboard table */}
        <div className="bg-[#0a1628] rounded-xl border border-[#1e3a5f] overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[3rem_1fr_5rem_5rem_5rem] gap-2 px-4 py-3 border-b border-[#1e3a5f] text-xs text-gray-500 font-semibold uppercase tracking-wider">
            <div className="text-center">#</div>
            <div>Jugador</div>
            <div className="text-right">Puntos</div>
            <div className="text-right hidden sm:block">Partidos</div>
            <div className="text-right hidden sm:block">Predics.</div>
          </div>

          {leaderboard.length === 0 ? (
            <div className="py-16 text-center text-gray-500">Aún no hay datos.</div>
          ) : (
            leaderboard.map((entry, idx) => {
              const isCurrentUser = user?.id === entry.id
              const medal = medals[entry.rank]

              return (
                <div
                  key={entry.id}
                  className={`grid grid-cols-[3rem_1fr_5rem_5rem_5rem] gap-2 px-4 py-3 items-center border-b border-[#1e3a5f]/50 last:border-b-0 transition-colors ${
                    isCurrentUser
                      ? 'bg-[#22c55e]/5 border-l-2 border-l-[#22c55e]'
                      : idx % 2 === 0
                      ? 'hover:bg-white/[0.02]'
                      : 'bg-white/[0.01] hover:bg-white/[0.02]'
                  }`}
                >
                  {/* Rank */}
                  <div className="text-center">
                    {medal ? (
                      <span className="text-xl leading-none">{medal}</span>
                    ) : (
                      <span
                        className={`text-sm font-bold ${
                          isCurrentUser ? 'text-[#22c55e]' : 'text-gray-500'
                        }`}
                      >
                        {entry.rank}
                      </span>
                    )}
                  </div>

                  {/* Player */}
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Avatar */}
                    {entry.avatar_url ? (
                      <img
                        src={entry.avatar_url}
                        alt={entry.display_name}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                          isCurrentUser
                            ? 'bg-[#22c55e]/20 text-[#22c55e]'
                            : 'bg-[#1e3a5f] text-gray-400'
                        }`}
                      >
                        {getInitials(entry.display_name)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div
                        className={`text-sm font-semibold truncate ${
                          isCurrentUser ? 'text-[#22c55e]' : 'text-white'
                        }`}
                      >
                        {entry.display_name}
                        {isCurrentUser && (
                          <span className="ml-1.5 text-xs font-normal text-[#22c55e]/70">
                            (tú)
                          </span>
                        )}
                      </div>
                      {/* Points breakdown sub-line */}
                      <div className="text-xs text-gray-500 mt-0.5 hidden sm:block">
                        Partidos: {entry.match_points} pts
                      </div>
                    </div>
                  </div>

                  {/* Total points */}
                  <div className="text-right">
                    <span className="text-base font-bold text-[#f59e0b]">
                      {entry.total_points}
                    </span>
                    <span className="text-xs text-gray-500 ml-0.5">pts</span>
                  </div>

                  {/* Match points */}
                  <div className="text-right hidden sm:block">
                    <span className="text-sm text-gray-300">{entry.match_points}</span>
                  </div>

                  {/* Prediction count */}
                  <div className="text-right hidden sm:block">
                    <span className="text-sm text-gray-400">{entry.predictions_count}</span>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-[#22c55e]/20 border border-[#22c55e]" />
            Tu posición
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#f59e0b] font-bold">pts</span>
            Puntos totales
          </div>
          <div className="flex items-center gap-1.5">
            Partidos = puntos por resultados · Predics. = predicciones enviadas
          </div>
        </div>
      </div>
    </div>
  )
}
