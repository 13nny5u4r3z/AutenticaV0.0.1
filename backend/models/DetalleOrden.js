'use strict';

const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class DetalleOrden extends Model {
  static asociar(modelos) {
    DetalleOrden.belongsTo(modelos.Orden,    { foreignKey: 'ordenId',    as: 'orden' });
    DetalleOrden.belongsTo(modelos.Producto, { foreignKey: 'productoId', as: 'producto' });
    DetalleOrden.belongsTo(modelos.Servicio, { foreignKey: 'servicioId', as: 'servicio' });
  }
}

function inicializar(sequelize) {
  DetalleOrden.init(
    {
      id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: () => uuidv4(),
        allowNull: false,
      },
      ordenId: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        references: { model: 'ordenes', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      productoId: {
        type: DataTypes.CHAR(36),
        allowNull: true,
        defaultValue: null,
        references: { model: 'productos', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        comment: 'Nulo si el detalle es de un servicio',
      },
      servicioId: {
        type: DataTypes.CHAR(36),
        allowNull: true,
        defaultValue: null,
        references: { model: 'servicios', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        comment: 'Nulo si el detalle es de un producto',
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: { args: [1], msg: 'La cantidad mínima es 1' },
          isInt: { msg: 'La cantidad debe ser un número entero' },
        },
      },
      precioUnitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: 'Precio al momento de la compra (histórico)',
        validate: {
          min: { args: [0], msg: 'El precio unitario no puede ser negativo' },
        },
      },
    },
    {
      sequelize,
      modelName: 'DetalleOrden',
      tableName: 'detalles_orden',
      timestamps: true,
      indexes: [
        { fields: ['ordenId'],    name: 'idx_detalle_orden' },
        { fields: ['productoId'], name: 'idx_detalle_producto' },
        { fields: ['servicioId'], name: 'idx_detalle_servicio' },
      ],
    }
  );

  return DetalleOrden;
}

module.exports = { DetalleOrden, inicializar };
