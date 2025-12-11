# 🔍 Verificación de Conexión con la Base de Datos

## Método 1: Usando Prisma CLI (Recomendado)

### Paso 1: Verificar que existe el archivo .env

```bash
# En Windows PowerShell
if (Test-Path .env) { Write-Host "✅ Archivo .env encontrado" } else { Write-Host "❌ Archivo .env NO encontrado" }
```

Si no existe, créalo copiando el ejemplo:
```bash
cp env.example .env
```

### Paso 2: Verificar la variable DATABASE_URL

Abre el archivo `.env` y verifica que tenga:

```env
DATABASE_URL=postgresql://usuario:contraseña@host:puerto/nombre_db?schema=public
```

**Ejemplo para Supabase:**
```env
DATABASE_URL=postgresql://postgres:[TU-PASSWORD]@db.[TU-PROJECT].supabase.co:5432/postgres?schema=public
```

### Paso 3: Generar el cliente de Prisma

```bash
npm run db:generate
```

### Paso 4: Verificar la conexión

```bash
# Opción 1: Intentar hacer push del schema (verifica conexión)
npm run db:push

# Opción 2: Abrir Prisma Studio (verifica conexión y muestra datos)
npm run db:studio
```

## Método 2: Verificación Manual con Prisma

### Verificar conexión básica

```bash
npx prisma db pull
```

Este comando intentará conectarse y leer el esquema de la base de datos.

### Verificar que las tablas existan

```bash
npx prisma db execute --stdin
```

Luego escribe:
```sql
SELECT tablename FROM pg_tables WHERE schemaname = 'public';
```

Presiona `Ctrl+D` (o `Ctrl+Z` en Windows) para ejecutar.

## Método 3: Crear un Script de Verificación

He creado un script en `scripts/check-db-connection.ts`. Para ejecutarlo:

```bash
# Instalar tsx si no está instalado
npm install -D tsx

# Ejecutar el script
npm run db:check
```

O directamente:
```bash
npx tsx scripts/check-db-connection.ts
```

## 🔧 Solución de Problemas Comunes

### Error: "Can't reach database server"

**Causas posibles:**
- La base de datos no está corriendo
- La URL de conexión es incorrecta
- Problemas de firewall/red

**Solución:**
1. Verifica que la base de datos esté activa
2. Verifica la URL en `.env`
3. Prueba conectarte con un cliente de PostgreSQL (pgAdmin, DBeaver, etc.)

### Error: "Authentication failed"

**Causas posibles:**
- Usuario o contraseña incorrectos
- El usuario no tiene permisos

**Solución:**
1. Verifica las credenciales en `.env`
2. Asegúrate de que el usuario tenga permisos en la base de datos

### Error: "Database does not exist"

**Causas posibles:**
- La base de datos no existe
- El nombre de la base de datos es incorrecto

**Solución:**
1. Crea la base de datos si no existe
2. Verifica el nombre en la URL de conexión

### Error: "P1001: Can't reach database server"

**Solución:**
1. Verifica que el servidor de base de datos esté corriendo
2. Verifica que el puerto sea correcto (5432 por defecto para PostgreSQL)
3. Verifica que no haya firewall bloqueando la conexión

## 📋 Checklist de Verificación

Antes de continuar, verifica:

- [ ] Archivo `.env` existe y tiene `DATABASE_URL` configurada
- [ ] La URL de conexión es correcta (usuario, contraseña, host, puerto, nombre de BD)
- [ ] El cliente de Prisma está generado (`npm run db:generate`)
- [ ] Puedes conectarte a la base de datos con `npm run db:push` o `npm run db:studio`
- [ ] Las tablas existen en la base de datos (si ya las creaste)

## 🎯 Próximos Pasos

Una vez verificada la conexión:

1. **Si es la primera vez:**
   ```bash
   npm run db:push
   ```
   Esto creará las tablas según tu `schema.prisma`

2. **Si ya tienes tablas:**
   ```bash
   npm run db:generate
   ```
   Esto generará el cliente de Prisma con los tipos correctos

3. **Para ver los datos:**
   ```bash
   npm run db:studio
   ```
   Abre una interfaz visual para ver y editar datos

## 📝 Configuración para Supabase

Si estás usando Supabase:

1. Ve a tu proyecto en Supabase Dashboard
2. Ve a **Settings** → **Database**
3. Copia la **Connection string** (URI)
4. Reemplaza `[YOUR-PASSWORD]` con tu contraseña real
5. Agrégala a `.env` como `DATABASE_URL`

Ejemplo:
```env
DATABASE_URL=postgresql://postgres.xxxxx:[TU-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?schema=public
```

## ✅ Verificación Exitosa

Si todo está bien, deberías ver:

- ✅ Cliente de Prisma generado sin errores
- ✅ `npm run db:push` ejecuta sin errores
- ✅ `npm run db:studio` se abre y muestra las tablas
- ✅ Puedes hacer queries desde tu código sin errores


