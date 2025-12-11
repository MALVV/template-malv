# 🔐 Configuración de Reset de Contraseña en Supabase

## 📋 Pasos para Configurar Reset de Contraseña

### 1. Acceder a la Configuración de URLs en Supabase

1. Ve a tu dashboard de Supabase: [supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Authentication** → **URL Configuration**

### 2. Configurar Site URL

En la sección **Site URL**, asegúrate de que esté configurado así:

**Para Desarrollo:**
```
http://localhost:3000
```

**Para Producción:**
```
https://tu-dominio.com
```

⚠️ **IMPORTANTE:** 
- El Site URL NO debe tener una barra final (`/`)
- Debe ser exactamente `http://localhost:3000` (sin `/` al final)

### 3. Agregar Redirect URLs

En la sección **Redirect URLs**, agrega las siguientes URLs (una por línea):

**Para Desarrollo:**
```
http://localhost:3000/auth/confirm
http://localhost:3000/auth/callback
http://localhost:3000/auth/reset-password
```

**Para Producción:**
```
https://tu-dominio.com/auth/confirm
https://tu-dominio.com/auth/callback
https://tu-dominio.com/auth/reset-password
```

### 4. Configurar Email Template para Reset Password

1. Ve a **Authentication** → **Email Templates**
2. Selecciona el template **Reset Password**
3. Verifica que el enlace de reset use:
   ```
   {{ .ConfirmationURL }}
   ```
   
   Este placeholder automáticamente incluirá la URL de redirección correcta (`/auth/reset-password`).

4. **Importante:** No cambies el `{{ .ConfirmationURL }}` - este es el que incluye automáticamente la URL de redirect.

### 5. Verificar Configuración de Email Provider

1. Ve a **Authentication** → **Providers**
2. Haz clic en **Email**
3. Asegúrate de que:
   - **Enable email confirmations** esté activado (toggle ON)
   - **Enable secure email change** esté activado (toggle ON) - opcional pero recomendado
4. Guarda los cambios

## 🧪 Probar el Reset de Contraseña

### Paso 1: Solicitar Reset

1. Ve a `http://localhost:3000/auth`
2. Haz clic en **"Forgot your password?"**
3. Ingresa tu email
4. Haz clic en **"Send reset link"**

### Paso 2: Verificar el Email

1. Revisa tu email (y la carpeta de spam)
2. Abre el email de "Reset Password"
3. Verifica que el enlace incluya: `redirect_to=http://localhost:3000/auth/reset-password`

El enlace debería verse así:
```
https://tu-proyecto.supabase.co/auth/v1/verify?token=...&type=recovery&redirect_to=http://localhost:3000/auth/reset-password
```

### Paso 3: Resetear la Contraseña

1. Haz clic en el enlace del email
2. Serás redirigido a `/auth/reset-password`
3. Ingresa tu nueva contraseña (debe cumplir los requisitos)
4. Confirma la contraseña
5. Haz clic en **"Update password"**
6. Serás redirigido automáticamente al dashboard

## 🔍 Verificar que Está Configurado Correctamente

### Checklist de Configuración

- [ ] Site URL está configurado correctamente (sin `/` al final)
- [ ] Las redirect URLs incluyen `/auth/reset-password`
- [ ] El template de email usa `{{ .ConfirmationURL }}`
- [ ] Email confirmations está habilitado
- [ ] Las variables de entorno están configuradas en `.env`

### Verificar Variables de Entorno

Asegúrate de que tu archivo `.env` tenga:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima
```

Y que estén correctas (sin espacios extra, sin comillas innecesarias).

## 🛠️ Solución de Problemas

### Problema: El enlace no redirige a `/auth/reset-password`

**Solución:**
1. Verifica que `/auth/reset-password` esté en la lista de Redirect URLs
2. Asegúrate de que el Site URL no tenga `/` al final
3. Reinicia el servidor de desarrollo
4. Solicita un nuevo enlace de reset

### Problema: "Invalid or expired link"

**Solución:**
1. Los enlaces de reset expiran después de cierto tiempo (por defecto 1 hora)
2. Solicita un nuevo enlace de reset
3. Verifica que el token en la URL sea válido

### Problema: No recibo el email

**Solución:**
1. Revisa la carpeta de spam
2. Verifica que el email esté correcto
3. Ve a **Authentication** → **Logs** en Supabase para ver si hay errores
4. Verifica que el email provider esté configurado correctamente

### Problema: Error al actualizar la contraseña

**Solución:**
1. Verifica que la contraseña cumpla todos los requisitos:
   - Al menos 8 caracteres
   - Una letra mayúscula
   - Una letra minúscula
   - Un número
2. Verifica que ambas contraseñas coincidan
3. Revisa la consola del navegador para ver errores específicos

## 📝 Configuración Completa para Desarrollo

**Site URL:**
```
http://localhost:3000
```

**Redirect URLs (agregar todas):**
```
http://localhost:3000/auth/confirm
http://localhost:3000/auth/callback
http://localhost:3000/auth/reset-password
```

## 📝 Configuración Completa para Producción

**Site URL:**
```
https://tu-dominio.com
```

**Redirect URLs (agregar todas):**
```
https://tu-dominio.com/auth/confirm
https://tu-dominio.com/auth/callback
https://tu-dominio.com/auth/reset-password
```

## ✅ Flujo Completo del Reset de Contraseña

1. Usuario hace clic en **"Forgot your password?"** en `/auth`
2. Ingresa su email en `/auth/forgot-password`
3. Supabase envía un email con un enlace de reset
4. Usuario hace clic en el enlace del email
5. Es redirigido a `/auth/reset-password` con el token en la URL
6. Usuario ingresa su nueva contraseña
7. La contraseña se actualiza en Supabase
8. Usuario es redirigido automáticamente al dashboard

¡Listo! El reset de contraseña debería funcionar correctamente.


