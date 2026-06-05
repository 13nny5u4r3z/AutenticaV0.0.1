'use strict';

const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class Usuario extends Model {
  /**
   * Método auxiliar para definir asociaciones.
   * Se llama desde src/models/index.js
   */
  static asociar(modelos) {
    Usuario.hasMany(modelos.Cita,        { foreignKey: 'usuarioId', as: 'citas' });
    Usuario.hasMany(modelos.Orden,       { foreignKey: 'usuarioId', as: 'ordenes' });
    Usuario.hasMany(modelos.Carrito,     { foreignKey: 'usuarioId', as: 'carrito' });
    Usuario.hasMany(modelos.Favorito,    { foreignKey: 'usuarioId', as: 'favoritos' });
  }
}

/**
 * @param {import('sequelize').Sequelize} sequelize
 */
function inicializar(sequelize) {
  Usuario.init(
    {
      id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: () => uuidv4(),
        allowNull: false,
        comment: 'UUID v4 generado automáticamente',
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'El nombre no puede estar vacío' },
          len: { args: [2, 100], msg: 'El nombre debe tener entre 2 y 100 caracteres' },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: 'idx_usuario_email',
          msg: 'Este correo electrónico ya está registrado',
        },
        validate: {
          isEmail: { msg: 'Formato de correo electrónico inválido' },
          notEmpty: { msg: 'El correo no puede estar vacío' },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Hash bcrypt de la contraseña',
      },
      rol: {
        type: DataTypes.ENUM('cliente', 'admin'),
        allowNull: false,
        defaultValue: 'cliente',
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        comment: 'Token de refresco JWT activo',
      },
      intentosFallidos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: { args: [0], msg: 'Los intentos fallidos no pueden ser negativos' },
        },
      },
      bloqueadoHasta: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        comment: 'Fecha hasta la que la cuenta está bloqueada por intentos fallidos',
      },
    },
    {
      sequelize,
      modelName: 'Usuario',
      tableName: 'usuarios',
      timestamps: true,
      indexes: [
        { unique: true, fields: ['email'], name: 'idx_usuario_email' },
      ],
      hooks: {
        /**
         * Antes de crear: normaliza email a minúsculas
         * (la unicidad real la garantiza el índice único en BD)
         */
        beforeCreate: async (usuario) => {
          if (usuario.email) {
            usuario.email = usuario.email.toLowerCase().trim();
          }
        },
        beforeUpdate: async (usuario) => {
          if (usuario.changed('email') && usuario.email) {
            usuario.email = usuario.email.toLowerCase().trim();
          }
        },
      },
    }
  );

  return Usuario;
}

module.exports = { Usuario, inicializar };
