const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sequelize = require('./src/config/database');
const { Usuario } = require('./models/index');
const { signRefreshToken, verifyRefreshToken } = require('./src/utils/jwt');

async function testRefreshFlow() {
    try {
        // 1. Get existing user
        const usuario = await Usuario.findOne({ where: { email: 'carlos@test.com' } });
        if (!usuario) {
            console.log('❌ Usuario no encontrado');
            return;
        }

        console.log('✅ Usuario encontrado:', usuario.email);
        console.log('   Password hash en BD:', usuario.password.substring(0, 30) + '...');
        console.log('   RefreshToken en BD:', usuario.refreshToken ? usuario.refreshToken.substring(0, 30) + '...' : 'NULL');

        // 2. Generate a new refresh token
        const payload = {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol
        };

        const newRefreshToken = signRefreshToken(payload);
        console.log('\n✅ Nuevo refreshToken generado:', newRefreshToken.substring(0, 30) + '...');

        // 3. Verify the token
        try {
            const decoded = verifyRefreshToken(newRefreshToken);
            console.log('✅ Token verificado correctamente');
            console.log('   Payload:', decoded);
        } catch (verifyError) {
            console.log('❌ Error verificando token:', verifyError.message);
        }

        // 4. Save and retrieve
        usuario.refreshToken = newRefreshToken;
        await usuario.save();
        console.log('\n✅ Token guardado en BD');

        // 5. Try to find user by token
        const foundUser = await Usuario.findOne({ where: { refreshToken: newRefreshToken } });
        console.log('✅ Usuario encontrado por token:', foundUser ? 'SÍ' : 'NO');

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await sequelize.close();
    }
}

testRefreshFlow();
