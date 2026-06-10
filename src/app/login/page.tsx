'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message)
      } else {
        router.push('/predictions')
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
        },
      })
      if (error) {
        setError(error.message)
      } else {
        setMessage('Revisa tu email para confirmar tu cuenta.')
      }
    }

    setLoading(false)
  }

  const handleGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/auth/callback',
      },
    })
    if (error) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-[#050d1a] flex items-start justify-center">
      <div className="max-w-md w-full mx-auto mt-20 bg-[#0a1628] rounded-2xl p-8 border border-white/10">
        {/* Title */}
        <h1 className="text-center text-2xl font-bold text-[#f0f4ff] mb-2">
          ⚽ Polla Mundial 2026
        </h1>
        <p className="text-center text-[#f0f4ff]/50 text-sm mb-8">
          Predice, compite y gana
        </p>

        {/* Tab switcher */}
        <div className="flex rounded-xl bg-white/5 p-1 mb-6">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); setMessage(null) }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === 'login'
                ? 'bg-[#22c55e] text-white'
                : 'text-[#f0f4ff]/60 hover:text-[#f0f4ff]'
            }`}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(null); setMessage(null) }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === 'register'
                ? 'bg-[#22c55e] text-white'
                : 'text-[#f0f4ff]/60 hover:text-[#f0f4ff]'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === 'register' && (
            <div>
              <label className="block text-[#f0f4ff]/70 text-sm mb-1.5">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-[#f0f4ff] placeholder-[#f0f4ff]/30 focus:outline-none focus:border-[#22c55e] transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-[#f0f4ff]/70 text-sm mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-[#f0f4ff] placeholder-[#f0f4ff]/30 focus:outline-none focus:border-[#22c55e] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[#f0f4ff]/70 text-sm mb-1.5">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-[#f0f4ff] placeholder-[#f0f4ff]/30 focus:outline-none focus:border-[#22c55e] transition-colors"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2.5 text-red-400 text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-lg px-4 py-2.5 text-[#22c55e] text-sm">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#22c55e] hover:bg-[#16a34a] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-colors mt-1"
          >
            {loading
              ? 'Cargando...'
              : mode === 'login'
              ? 'Iniciar sesión'
              : 'Crear cuenta'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[#f0f4ff]/30 text-xs">o continúa con</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Google button */}
        <button
          type="button"
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-[#f0f4ff] font-medium py-2.5 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </button>
      </div>
    </div>
  )
}
