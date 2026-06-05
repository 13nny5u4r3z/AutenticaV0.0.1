'use strict';

const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class Orden extends Model {
  static asociar(modelos) {
    Orden.belongsTo(modelos.Usuario,      { foreignKey: 'usuarioId', as: 'usuario' });
    Orden.hasMany(modelos.DetalleOrden,   { foreignKey: 'ordenId',   as: 'detalles' });
    // Relación 1:1 con Envio
    Orden.hasOne(modelos.Envio,           { foreignKey: 'ordenId',   as: 'envio' });
  }
}

function inicializar(sequelize) {
  Orden.init(
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
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: { args: [0], msg: 'El total no puede ser negativo' },
          isDecimal: { msg: 'El total debe ser un número decimal válido' },
        },
      },
      estado: {
        type: DataTypes.ENUM('pendiente', 'pagado', 'enviado', 'entregado', 'cancelado'),
        allowNull: false,
        defaultValue: 'pendiente',
      },
      mercadopagoId: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        comment: 'ID de pago en MercadoPago',
      },
    },
    {
      sequelize,
      modelName: 'Orden',
      tableName: 'ordenes',
      timestamps: true,
      indexes: [
        { fields: ['usuarioId'], name: 'idx_orden_usuario' },
        { fields: ['estado'],    name: 'idx_orden_estado' },
      ],
    }
  );

  return Orden;
}

module.exports = { Orden, inicializar };
