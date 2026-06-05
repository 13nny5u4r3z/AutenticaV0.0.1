'use strict';

require('dotenv').config();

const app        = require('./app');
const { sequelize } = require('./models');   // importa todos los modelos como efecto secundario

const PUERTO = parseInt(process.env.PORT, 10) || 3000;

/**
 * Arranca el servidor:
 * 1. Prueba la conexión a MySQL.
 * 2. Sincroniza los modelos con la BD (crea tablas si no existen).
 * 3. Inicia Express.
 */
async function iniciar() {
  try {
    // 1. Verificar conexión a la base de datos
    await sequelize.authenticate();
    console.log('✅  Conexión a MySQL establecida correctamente.');

    // 2. Sincronizar modelos
    //    { alter: false } → solo crea tablas nuevas; no modifica columnas existentes
    //    Para migraciones usa Sequelize CLI con archivos de migración dedicados.
    await sequelize.sync({ alter: false });
    console.log('✅  Modelos sincronizados con la base de datos.');

    // 3. Iniciar servidor HTTP
    app.listen(PUERTO, () => {
      console.log(`🚀  Servidor corriendo en http://localhost:${PUERTO}`);
      console.log(`🌍  Entorno: ${process.env.NODE_ENV || 'development'}`);
      console.log(`❤️   Health check: http://localhost:${PUERTO}/health`);
    });
  } catch (error) {
    console.error('❌  Error al iniciar el servidor:', error.message);
    console.error(error);
    process.exit(1);
  }
}

// Manejar señales de apagado limpio
process.on('SIGINT',  () => apagar('SIGINT'));
process.on('SIGTERM', () => apagar('SIGTERM'));

async function apagar(señal) {
  console.log(`\n🛑  Señal ${señal} recibida. Cerrando servidor...`);
  try {
    await sequelize.close();
    console.log('✅  Conexión a BD cerrada.');
  } catch (e) {
    console.error('⚠️   Error al cerrar BD:', e.message);
  }
  process.exit(0);
}

iniciar();
