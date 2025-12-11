# 🔧 Configuración de Prisma 7 con Next.js 16 y Supabase

## 📋 Versiones Actuales

- **Next.js**: 16.0.8
- **Prisma**: 7.1.0
- **Supabase**: Última versión

## 🚀 Configuración Paso a Paso

### 1. Instalar Dependencias

Asegúrate de tener las versiones correctas:

```bash
npm install @prisma/client@^7.1.0
npm install -D prisma@^7.1.0
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (copia de `env.example`):

```env
# Supabase - Autenticación
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima

# Database (Prisma) - Connection Pooler (RECOMENDADO para Supabase)
# Usa el Connection Pooler de Supabase para mejor rendimiento en producción
DATABASE_URL=postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1

# Database (Prisma) - Direct Connection (OPCIONAL)
# Usa la conexión directa solo para migraciones y Prisma Studio
DIRECT_URL=postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
```

### 3. Obtener la URL de Conexión de Supabase

1. Ve a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
2. Ve a **Settings** → **Database**
3. En la sección **Connection string**, selecciona **URI**
4. Copia la cadena de conexión
5. Reemplaza `[YOUR-PASSWORD]` con tu contraseña real

**Tip:** Para producción, usa el **Connection Pooler** (puerto 6543) en lugar de la conexión directa (puerto 5432).

### 4. Configurar el Schema de Prisma

El archivo `prisma/schema.prisma` ya está configurado correctamente:

```prisma
generator client {
  provider = "prisma-client-js"
  previewFeatures = []
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL") // Opcional: para migraciones
}
```

### 5. Generar el Cliente de Prisma

```bash
npm run db:generate
```

Este comando genera el cliente de Prisma basado en tu schema.

### 6. Aplicar el Schema a la Base de Datos

**Opción A: Usar `db:push` (desarrollo rápido)**

```bash
npm run db:push
```

**Opción B: Usar migraciones (producción recomendado)**

```bash
npm run db:migrate
```

Esto creará las tablas en tu base de datos de Supabase según tu schema.

### 7. Verificar la Conexión

```bash
# Abrir Prisma Studio para ver los datos
npm run db:studio
```

O verifica la conexión con:

```bash
npm run db:check
```

## 🔍 Configuración del Cliente de Prisma

El cliente está configurado en `src/lib/prisma.ts` con las mejores prácticas para Next.js 16:

- ✅ Singleton pattern para evitar múltiples instancias
- ✅ Logging configurado según el entorno
- ✅ Cleanup automático al cerrar la aplicación

## 📝 Uso del Cliente de Prisma

### En Server Components (Next.js App Router)

```typescript
import { prisma } from '@/lib/prisma'

export default async function Page() {
  const users = await prisma.user.findMany()
  
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.email}</div>
      ))}
    </div>
  )
}
```

### En Server Actions

```typescript
'use server'

import { prisma } from '@/lib/prisma'

export async function createUser(email: string, name?: string) {
  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
  })
  
  return user
}
```

### En API Routes

```typescript
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}
```

## ⚠️ Consideraciones Importantes

### Connection Pooling con Supabase

Supabase recomienda usar el **Connection Pooler** para aplicaciones en producción:

- **Puerto 6543**: Connection Pooler (usar en `DATABASE_URL`)
- **Puerto 5432**: Conexión directa (usar en `DIRECT_URL` solo para migraciones)

### Límites de Conexión

El Connection Pooler de Supabase tiene límites:
- **Free tier**: 60 conexiones simultáneas
- **Pro tier**: 200 conexiones simultáneas

El cliente de Prisma está configurado con `connection_limit=1` para evitar agotar las conexiones.

### Migraciones

Para ejecutar migraciones, usa la conexión directa (`DIRECT_URL`):

```bash
# Prisma automáticamente usará DIRECT_URL si está disponible
npm run db:migrate
```

## 🔧 Solución de Problemas

### Error: "Can't reach database server"

**Solución:**
1. Verifica que la URL de conexión sea correcta
2. Verifica que tu IP esté en la lista de IPs permitidas en Supabase
3. Para desarrollo local, agrega `0.0.0.0/0` en **Settings** → **Database** → **Connection pooling**

### Error: "P1001: Can't reach database server"

**Solución:**
1. Verifica que estés usando el puerto correcto (6543 para pooler, 5432 para directo)
2. Verifica que `pgbouncer=true` esté en la URL cuando uses el pooler
3. Verifica las credenciales

### Error: "P1000: Authentication failed"

**Solución:**
1. Verifica que la contraseña sea correcta
2. Verifica que el usuario tenga permisos
3. Asegúrate de reemplazar `[YOUR-PASSWORD]` con la contraseña real

### Error al ejecutar migraciones

**Solución:**
1. Asegúrate de tener `DIRECT_URL` configurada
2. Usa la conexión directa (puerto 5432) para migraciones
3. Verifica que tengas permisos de escritura

## 📋 Checklist de Configuración

Antes de continuar, verifica:

- [ ] Prisma 7.1.0 instalado (`@prisma/client` y `prisma`)
- [ ] Archivo `.env` creado con `DATABASE_URL` configurada
- [ ] `DIRECT_URL` configurada (opcional pero recomendado)
- [ ] Cliente de Prisma generado (`npm run db:generate`)
- [ ] Schema aplicado a la base de datos (`npm run db:push` o `npm run db:migrate`)
- [ ] Conexión verificada (`npm run db:studio` o `npm run db:check`)

## 🎯 Próximos Pasos

1. **Definir tus modelos** en `prisma/schema.prisma`
2. **Ejecutar migraciones** cuando cambies el schema
3. **Usar el cliente** en tus componentes y API routes
4. **Monitorear las conexiones** en el dashboard de Supabase

## 📚 Recursos Adicionales

- [Documentación de Prisma](https://www.prisma.io/docs)
- [Guía de Supabase con Prisma](https://supabase.com/docs/guides/database/prisma)
- [Next.js App Router con Prisma](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)

## ✅ Configuración Completa

Una vez completados todos los pasos, deberías poder:

- ✅ Conectarte a la base de datos de Supabase
- ✅ Ejecutar queries con Prisma
- ✅ Ver datos en Prisma Studio
- ✅ Ejecutar migraciones sin problemas

¡Listo! Tu configuración de Prisma con Supabase está completa.


