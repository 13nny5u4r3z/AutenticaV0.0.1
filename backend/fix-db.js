const sequelize = require('./src/config/database');

async function fixDB() {
    try {
        // Add missing columns
        console.log('Adding missing columns to usuarios table...');

        await sequelize.query(`
      ALTER TABLE usuarios 
      ADD COLUMN codigoRecuperacion VARCHAR(6) NULL DEFAULT NULL COMMENT 'Código de recuperación de contraseña de 6 dígitos' AFTER bloqueadoHasta
    `);
        console.log('✅ Added codigoRecuperacion column');

        await sequelize.query(`
      ALTER TABLE usuarios 
      ADD COLUMN codigoRecuperacionExpiracion DATETIME NULL DEFAULT NULL COMMENT 'Fecha y hora de expiración del código de recuperación' AFTER codigoRecuperacion
    `);
        console.log('✅ Added codigoRecuperacionExpiracion column');

        console.log('\n✅ Database schema updated successfully');

    } catch (error) {
        // Check if columns already exist
        if (error.message.includes('Duplicate column')) {
            console.log('⚠️ Columns already exist, skipping...');
        } else {
            console.error('❌ Error:', error.message);
            console.error(error);
        }
    } finally {
        await sequelize.close();
    }
}

fixDB();
