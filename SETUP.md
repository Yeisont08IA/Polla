# Configuración - Polla Mundial 2026

## 1. Crear proyecto en Supabase (gratis)

1. Ve a https://supabase.com → "Start your project" → crea cuenta con GitHub/Google
2. "New project" → ponle nombre: `polla-mundial` → elige región: **South America (São Paulo)**
3. Guarda la contraseña de la base de datos

## 2. Configurar la base de datos

En el dashboard de Supabase → **SQL Editor** → copia y ejecuta el contenido de:
1. `supabase/schema.sql` (tablas, políticas, funciones, trigger de puntos)
2. `supabase/matches_data.sql` (los 104 partidos del Mundial 2026)

## 3. Activar autenticación

En Supabase → **Authentication → Providers**:

### Email/Password (ya viene activado por defecto) ✓

### Google OAuth:
1. Ve a https://console.cloud.google.com → crea proyecto
2. APIs & Services → Credentials → "Create OAuth 2.0 Client ID"
3. Authorized redirect URIs: `https://TU_PROYECTO.supabase.co/auth/v1/callback`
4. Copia Client ID y Client Secret
5. En Supabase → Auth → Providers → Google → pega las credenciales

## 4. Variables de entorno

1. En Supabase → Settings → API → copia:
   - `Project URL`
   - `anon public` key

2. Crea el archivo `.env.local` en la raíz del proyecto:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

## 5. Hacer tú el primer admin

Después de registrarte en la app, ejecuta en Supabase SQL Editor:
```sql
UPDATE profiles SET is_admin = true WHERE display_name = 'TU_NOMBRE';
-- o con el email:
UPDATE profiles SET is_admin = true 
WHERE id = (SELECT id FROM auth.users WHERE email = 'tu@email.com');
```

## 6. Deploy en Vercel (gratis)

1. Sube el código a GitHub: `git push`
2. Ve a https://vercel.com → "New Project" → importa el repo
3. En "Environment Variables" agrega las dos variables del paso 4
4. Deploy → obtienes tu URL: `https://polla-mundial-xxx.vercel.app`

## 7. Compartir con participantes

Envía la URL de Vercel a tus amigos. Pueden registrarse con email o Google directamente.

---

## Sistema de puntos

| Acierto | Puntos |
|---------|--------|
| Ganador / Empate correcto | +3 |
| Resultado exacto (bonus) | +2 |
| Goles local acertados | +1 |
| Goles visitante acertados | +1 |
| **Máximo por partido** | **7** |
| Campeón del torneo | +18 |
| Subcampeón del torneo | +15 |
| Tercer puesto del torneo | +12 |

## Flujo como admin

1. Los partidos se bloquean automáticamente 10 minutos antes
2. Cuando termine un partido, ve a `/admin` → ingresa el resultado → marca "Finalizado"
3. Los puntos se calculan automáticamente para todos los participantes
4. Para delegar admin a alguien: `/admin` → Gestión de Usuarios → "Hacer admin"
