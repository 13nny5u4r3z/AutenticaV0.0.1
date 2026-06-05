const sequelize = require('./src/config/database');

async function testDB() {
    try {
        // Test connection
        await sequelize.authenticate();
        console.log('✅ Connected to MySQL');

        // Check table exists
        const result = await sequelize.query(
            `SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE, COLUMN_KEY 
       FROM INFORMATION_SCHEMA.COLUMNS 
       WHERE TABLE_NAME = 'usuarios' AND TABLE_SCHEMA = 'asesoria_imagen'
       ORDER BY ORDINAL_POSITION`
        );

        console.log('\nTabla usuarios columns:');
        console.table(result[0]);

        // Try a simple SELECT
        console.log('\nExecuting SELECT * FROM usuarios...');
        const usuarios = await sequelize.query('SELECT * FROM usuarios LIMIT 1');
        console.log('Result:', usuarios[0]);

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error);
    } finally {
        await sequelize.close();
    }
}

testDB();
