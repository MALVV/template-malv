import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

async function checkConnection() {
  console.log('🔍 Verificando conexión con la base de datos...\n');

  try {
    // Verificar variable de entorno
    const databaseUrl = process.env.DATABASE_URL;
    
    if (!databaseUrl) {
      console.error('❌ Error: DATABASE_URL no está configurada en las variables de entorno');
      console.log('\n💡 Solución:');
      console.log('1. Crea un archivo .env en la raíz del proyecto');
      console.log('2. Agrega: DATABASE_URL=tu_url_de_conexion');
      console.log('3. Ejemplo: DATABASE_URL=postgresql://user:password@localhost:5432/dbname?schema=public');
      process.exit(1);
    }

    console.log('✅ Variable DATABASE_URL encontrada');
    console.log(`   URL: ${databaseUrl.replace(/:[^:@]+@/, ':****@')}\n`); // Ocultar contraseña

    // Intentar conectar
    console.log('🔄 Intentando conectar...');
    await prisma.$connect();
    console.log('✅ Conexión exitosa!\n');

    // Verificar que el cliente esté generado
    console.log('🔍 Verificando cliente de Prisma...');
    try {
      await prisma.$queryRaw`SELECT 1`;
      console.log('✅ Cliente de Prisma generado correctamente\n');
    } catch (error) {
      console.warn('⚠️  Advertencia: El cliente de Prisma podría no estar generado');
      console.log('💡 Ejecuta: npm run db:generate\n');
    }

    // Verificar tablas existentes
    console.log('🔍 Verificando esquema de la base de datos...');
    const tables = await prisma.$queryRaw<Array<{ tablename: string }>>`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
    `;
    
    console.log(`✅ Tablas encontradas: ${tables.length}`);
    if (tables.length > 0) {
      console.log('   Tablas:');
      tables.forEach((table: { tablename: string }) => {
        console.log(`   - ${table.tablename}`);
      });
    } else {
      console.log('⚠️  No hay tablas en el esquema público');
      console.log('💡 Ejecuta: npm run db:push para crear las tablas\n');
    }

    // Verificar modelo User
    console.log('\n🔍 Verificando modelo User...');
    try {
      const userCount = await prisma.user.count();
      console.log(`✅ Modelo User accesible (${userCount} usuarios en la base de datos)`);
    } catch (error: unknown) {
      console.error('❌ Error al acceder al modelo User:');
      console.error(`   ${error instanceof Error ? error.message : String(error)}`);
      console.log('\n💡 Solución:');
      console.log('1. Verifica que el schema.prisma tenga el modelo User');
      console.log('2. Ejecuta: npm run db:push');
      console.log('3. Ejecuta: npm run db:generate');
    }

    console.log('\n✅ Verificación completada exitosamente!');
    
  } catch (error: unknown) {
    console.error('\n❌ Error al conectar con la base de datos:');
    console.error(`   ${error instanceof Error ? error.message : String(error)}\n`);
    const err = error as { code?: string };
    if (err.code === 'P1001') {
      console.log('💡 Posibles soluciones:');
      console.log('1. Verifica que la base de datos esté corriendo');
      console.log('2. Verifica que la URL de conexión sea correcta');
      console.log('3. Verifica credenciales (usuario, contraseña)');
      console.log('4. Verifica que el puerto sea correcto (por defecto 5432 para PostgreSQL)');
    } else if (err.code === 'P1000') {
      console.log('💡 Posibles soluciones:');
      console.log('1. Verifica que la base de datos exista');
      console.log('2. Verifica que tengas permisos para acceder');
    } else if (err.code === 'P1017') {
      console.log('💡 Posibles soluciones:');
      console.log('1. La conexión se cerró inesperadamente');
      console.log('2. Verifica la estabilidad de la conexión');
      console.log('3. Intenta nuevamente');
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

checkConnection();


