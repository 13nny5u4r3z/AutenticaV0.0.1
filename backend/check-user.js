const sequelize = require('./src/config/database');
const { Usuario } = require('./models/index');

async function checkUser() {
    try {
        const usuario = await Usuario.findOne({ where: { email: 'maria@example.com' } });
        if (usuario) {
            console.log('✅ Usuario encontrado:');
            console.log('  ID:', usuario.id);
            console.log('  Nombre:', usuario.nombre);
            console.log('  Email:', usuario.email);
            console.log('  Rol:', usuario.rol);
            console.log('  Password hash:', usuario.password);
        } else {
            console.log('❌ Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await sequelize.close();
    }
}

checkUser();
