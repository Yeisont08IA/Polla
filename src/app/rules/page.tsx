export default function RulesPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">📋 Reglas y Puntuación</h1>
        <p className="text-white/50">Todo lo que necesitas saber para ganar la Polla Mundial 2026</p>
      </div>

      {/* Puntos por partido */}
      <section className="bg-[#0a1628] rounded-2xl border border-white/10 p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
          ⚽ Puntos por Partido
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <div>
              <p className="text-white font-semibold">Ganador / Empate correcto</p>
              <p className="text-white/40 text-sm mt-0.5">Acertaste quién gana o que sería empate</p>
            </div>
            <span className="text-2xl font-bold text-green-400">+3</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div>
              <p className="text-white font-semibold">Marcador exacto</p>
              <p className="text-white/40 text-sm mt-0.5">Acertaste el resultado exacto (ej. 2-1)</p>
            </div>
            <span className="text-2xl font-bold text-amber-400">+2</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <div>
              <p className="text-white font-semibold">Goles del equipo local</p>
              <p className="text-white/40 text-sm mt-0.5">Acertaste exactamente los goles del equipo de casa</p>
            </div>
            <span className="text-2xl font-bold text-blue-400">+1</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <div>
              <p className="text-white font-semibold">Goles del equipo visitante</p>
              <p className="text-white/40 text-sm mt-0.5">Acertaste exactamente los goles del equipo visitante</p>
            </div>
            <span className="text-2xl font-bold text-blue-400">+1</span>
          </div>
        </div>

        {/* Ejemplo */}
        <div className="mt-5 p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-white/60 text-sm font-semibold mb-3">Ejemplo:</p>
          <div className="grid grid-cols-3 gap-3 text-center text-sm mb-3">
            <div>
              <p className="text-white/40 text-xs mb-1">Tu predicción</p>
              <p className="text-white font-bold text-lg">2 - 1</p>
            </div>
            <div>
              <p className="text-white/40 text-xs mb-1">Resultado real</p>
              <p className="text-white font-bold text-lg">3 - 1</p>
            </div>
            <div>
              <p className="text-white/40 text-xs mb-1">Puntos</p>
              <p className="text-green-400 font-bold text-lg">4 pts</p>
            </div>
          </div>
          <div className="space-y-1 text-xs text-white/40">
            <p>✓ Ganador correcto (local) → +3</p>
            <p>✓ Goles visitante correctos (1) → +1</p>
            <p>✗ Goles local incorrectos (predijiste 2, fue 3) → 0</p>
            <p>✗ Marcador exacto → 0</p>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-center">
          <p className="text-amber-400 text-sm">
            <span className="font-bold">Máximo por partido: 7 puntos</span>
            <span className="text-white/40 ml-2">(ganador + exacto + 2 goles)</span>
          </p>
        </div>
      </section>

      {/* Predicción de torneo */}
      <section className="bg-[#0a1628] rounded-2xl border border-white/10 p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
          🏆 Predicción del Torneo
        </h2>
        <p className="text-white/50 text-sm mb-4">
          Antes del inicio del torneo puedes predecir los tres primeros lugares. Estos puntos se suman al final.
        </p>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏆</span>
              <div>
                <p className="text-white font-semibold">Campeón del Mundial</p>
                <p className="text-white/40 text-sm">Aciertas el campeón</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-amber-400">+18</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-500/10 border border-slate-500/20">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🥈</span>
              <div>
                <p className="text-white font-semibold">Subcampeón</p>
                <p className="text-white/40 text-sm">Aciertas el finalista perdedor</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-slate-300">+15</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🥉</span>
              <div>
                <p className="text-white font-semibold">Tercer Puesto</p>
                <p className="text-white/40 text-sm">Aciertas el ganador del 3er/4to lugar</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-orange-400">+12</span>
          </div>
        </div>
      </section>

      {/* Reglas generales */}
      <section className="bg-[#0a1628] rounded-2xl border border-white/10 p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
          📌 Reglas Generales
        </h2>
        <ul className="space-y-4">
          {[
            { icon: '⏰', title: 'Cierre de predicciones', desc: 'Las predicciones se bloquean automáticamente 10 minutos antes del inicio de cada partido. Después de ese tiempo no se pueden modificar.' },
            { icon: '👁️', title: 'Visibilidad de predicciones', desc: 'Las predicciones de los demás participantes solo son visibles después del cierre. Antes del cierre nadie puede ver la predicción del otro.' },
            { icon: '0️⃣', title: 'Sin predicción = 0 puntos', desc: 'Si no ingresas una predicción para un partido antes del cierre, no sumas ningún punto por ese partido.' },
            { icon: '📅', title: 'Puedes llenar a diario', desc: 'No es necesario predecir los 104 partidos de una sola vez. Puedes ir llenando día a día antes del cierre de cada partido.' },
            { icon: '🏆', title: 'Predicción de torneo', desc: 'Tienes 5 días desde el inicio del Mundial (hasta el 16 de junio a las 11:59 PM) para elegir campeón, subcampeón y tercer puesto. Después de esa fecha no se puede modificar.' },
            { icon: '🔄', title: 'Fases eliminatorias', desc: 'Los partidos de octavos, cuartos, semis y final se habilitan cuando se conozcan los equipos clasificados.' },
            { icon: '🏅', title: 'Clasificación en tiempo real', desc: 'La tabla de posiciones se actualiza automáticamente después de cada resultado.' },
          ].map(({ icon, title, desc }) => (
            <li key={title} className="flex gap-4">
              <span className="text-2xl flex-shrink-0">{icon}</span>
              <div>
                <p className="text-white font-semibold">{title}</p>
                <p className="text-white/50 text-sm mt-0.5">{desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Resumen rápido */}
      <section className="bg-gradient-to-br from-green-900/30 to-amber-900/20 rounded-2xl border border-green-500/20 p-6">
        <h2 className="text-xl font-bold text-white mb-4 text-center">⚡ Resumen Rápido</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          {[
            { label: 'Ganador', pts: '3', color: 'text-green-400' },
            { label: 'Exacto', pts: '2', color: 'text-amber-400' },
            { label: 'Goles x equipo', pts: '1', color: 'text-blue-400' },
            { label: 'Máx/partido', pts: '7', color: 'text-white' },
            { label: 'Campeón', pts: '18', color: 'text-amber-400' },
            { label: 'Subcampeón', pts: '15', color: 'text-slate-300' },
            { label: 'Tercer puesto', pts: '12', color: 'text-orange-400' },
            { label: 'Total partidos', pts: '104', color: 'text-white/60' },
          ].map(({ label, pts, color }) => (
            <div key={label} className="bg-white/5 rounded-xl p-3">
              <p className={`text-2xl font-bold ${color}`}>+{pts}</p>
              <p className="text-white/40 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
