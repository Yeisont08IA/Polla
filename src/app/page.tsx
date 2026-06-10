import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050d1a] text-[#f0f4ff]">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 pt-24 pb-16">
        <div className="text-7xl mb-6">⚽</div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
          <span className="text-[#22c55e]">Polla</span>{' '}
          <span className="text-[#f59e0b]">Mundial</span>{' '}
          <span className="text-[#f0f4ff]">2026</span>
        </h1>
        <p className="text-xl text-[#f0f4ff]/70 max-w-lg mb-2">
          Predice los marcadores, compite con tus amigos
        </p>
        <p className="text-sm text-[#22c55e] mb-10 font-medium">
          El Mundial comienza el 11 de junio de 2026 — ¡ya puedes predecir!
        </p>
        <Link
          href="/predictions"
          className="inline-block bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-lg px-10 py-4 rounded-2xl transition-colors shadow-lg shadow-[#22c55e]/20"
        >
          Ir a mis predicciones →
        </Link>
      </section>

      {/* Feature cards */}
      <section className="max-w-5xl mx-auto px-4 pb-24 grid md:grid-cols-3 gap-6">
        {/* Card 1: Predicciones */}
        <div className="bg-[#0a1628] border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
          <div className="text-4xl">🎯</div>
          <h2 className="text-lg font-bold text-[#f0f4ff]">Predicciones de partidos</h2>
          <p className="text-[#f0f4ff]/60 text-sm leading-relaxed">
            Predice el marcador exacto de cada partido de la fase de grupos y eliminatorias antes de que comiencen. Cambia tus predicciones hasta el pitido inicial.
          </p>
        </div>

        {/* Card 2: Puntuación */}
        <div className="bg-[#0a1628] border border-[#f59e0b]/30 rounded-2xl p-6 flex flex-col gap-3">
          <div className="text-4xl">🏆</div>
          <h2 className="text-lg font-bold text-[#f59e0b]">Sistema de puntuación</h2>
          <ul className="text-[#f0f4ff]/60 text-sm space-y-1.5">
            <li className="flex justify-between">
              <span>Resultado exacto</span>
              <span className="text-[#22c55e] font-semibold">+2 pts</span>
            </li>
            <li className="flex justify-between">
              <span>Ganador correcto</span>
              <span className="text-[#22c55e] font-semibold">+3 pts</span>
            </li>
            <li className="flex justify-between">
              <span>Goles exactos (c/u)</span>
              <span className="text-[#22c55e] font-semibold">+1 pt</span>
            </li>
            <li className="border-t border-white/10 pt-1.5 flex justify-between">
              <span>Campeón</span>
              <span className="text-[#f59e0b] font-bold">+18 pts</span>
            </li>
            <li className="flex justify-between">
              <span>Subcampeón</span>
              <span className="text-[#f59e0b] font-semibold">+15 pts</span>
            </li>
            <li className="flex justify-between">
              <span>3er lugar</span>
              <span className="text-[#f59e0b] font-semibold">+12 pts</span>
            </li>
          </ul>
        </div>

        {/* Card 3: Clasificación */}
        <div className="bg-[#0a1628] border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
          <div className="text-4xl">📊</div>
          <h2 className="text-lg font-bold text-[#f0f4ff]">Clasificación en vivo</h2>
          <p className="text-[#f0f4ff]/60 text-sm leading-relaxed">
            Sigue la tabla de clasificación en tiempo real mientras avanza el torneo. Compara tus puntos con los de tus amigos y rivales en cada jornada.
          </p>
          <Link
            href="/leaderboard"
            className="mt-auto inline-block text-center bg-white/5 hover:bg-white/10 text-[#f0f4ff] text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Ver clasificación
          </Link>
        </div>
      </section>

      {/* Footer note */}
      <footer className="text-center pb-10 text-[#f0f4ff]/30 text-xs">
        Mundial 2026 · USA, Canadá &amp; México · 11 jun – 19 jul 2026
      </footer>
    </main>
  )
}
