# 🚀 Configuración de Supabase - Guía Rápida

## URLs de Redirección a Configurar

### Paso 1: Ve al Dashboard de Supabase

1. Abre [supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Authentication** (en el menú lateral)
4. Haz clic en **URL Configuration**

### Paso 2: Configura el Site URL

En el campo **Site URL**, ingresa:

```
http://localhost:3000
```

### Paso 3: Agrega las Redirect URLs

En el campo **Redirect URLs**, agrega estas URLs (una por línea):

```
http://localhost:3000/auth/confirm
http://localhost:3000/auth/callback
```

**Para producción** (cuando despliegues), también agrega:

```
https://tu-dominio.com/auth/confirm
https://tu-dominio.com/auth/callback
```

### Paso 4: Habilita la Confirmación de Email

1. Ve a **Authentication** → **Providers**
2. Haz clic en **Email**
3. Activa el toggle **Enable email confirmations**
4. Guarda los cambios

### Paso 5: Configura las Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima
DATABASE_URL=postgresql://user:password@localhost:5432/davincii?schema=public
```

## ✅ Verificación

Después de configurar:

1. ✅ Las redirect URLs están agregadas en Supabase
2. ✅ Email confirmations está habilitado
3. ✅ Las variables de entorno están configuradas
4. ✅ El servidor de desarrollo está corriendo (`npm run dev`)

## 🧪 Probar

1. Ve a `http://localhost:3000/auth`
2. Crea una cuenta nueva
3. Revisa tu email
4. Haz clic en el enlace de confirmación
5. Deberías ser redirigido a `/auth/confirm` y luego a `/dashboard`

## 📝 Notas Importantes

- Las URLs deben coincidir **exactamente** (incluyendo http/https)
- No agregues barras finales (`/`) a las URLs
- Para desarrollo, usa `http://localhost:3000`
- Para producción, usa `https://tu-dominio.com`

