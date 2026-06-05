'use strict';

const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class Carrito extends Model {
  static asociar(modelos) {
    Carrito.belongsTo(modelos.Usuario,  { foreignKey: 'usuarioId',  as: 'usuario' });
    Carrito.belongsTo(modelos.Producto, { foreignKey: 'productoId', as: 'producto' });
    Carrito.belongsTo(modelos.Servicio, { foreignKey: 'servicioId', as: 'servicio' });
  }
}

function inicializar(sequelize) {
  Carrito.init(
    {
      id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: () => uuidv4(),
        allowNull: false,
      },
      usuarioId: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        references: { model: 'usuarios', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      productoId: {
        type: DataTypes.CHAR(36),
        allowNull: true,
        defaultValue: null,
        references: { model: 'productos', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        comment: 'Nulo si el ítem es un servicio',
      },
      servicioId: {
        type: DataTypes.CHAR(36),
        allowNull: true,
        defaultValue: null,
        references: { model: 'servicios', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        comment: 'Nulo si el ítem es un producto',
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: { args: [1], msg: 'La cantidad mínima en carrito es 1' },
          isInt: { msg: 'La cantidad debe ser un número entero' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Carrito',
      tableName: 'carritos',
      timestamps: true,
      indexes: [
        { fields: ['usuarioId'],  name: 'idx_carrito_usuario' },
        { fields: ['productoId'], name: 'idx_carrito_producto' },
        { fields: ['servicioId'], name: 'idx_carrito_servicio' },
      ],
    }
  );

  return Carrito;
}

module.exports = { Carrito, inicializar };
