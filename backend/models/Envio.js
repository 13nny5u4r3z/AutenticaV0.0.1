'use strict';

const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

/**
 * NOTA DE SEGURIDAD:
 * Los campos `direccion` y `telefono` almacenan texto cifrado con AES-256-GCM.
 * La encriptación/desencriptación se realiza en la utilidad src/utils/cifrado.js.
 * Aquí solo se definen como TEXT para soportar el largo de la cadena cifrada.
 */
class Envio extends Model {
  static asociar(modelos) {
    // Relación 1:1: Envio pertenece a una Orden (tiene la FK)
    Envio.belongsTo(modelos.Orden, { foreignKey: 'ordenId', as: 'orden' });
  }
}

function inicializar(sequelize) {
  Envio.init(
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
        unique: {
          name: 'idx_envio_orden_unique',
          msg: 'Esta orden ya tiene un envío registrado',
        },
        references: { model: 'ordenes', key: 'id' },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        comment: 'Relación 1:1 con Orden',
      },
      direccion: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: 'Dirección de envío cifrada con AES-256-GCM',
      },
      telefono: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: 'Teléfono de contacto cifrado con AES-256-GCM',
      },
      trackingNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        comment: 'Número de guía del paquete',
      },
      estado: {
        type: DataTypes.ENUM('pendiente', 'en_camino', 'entregado', 'problema'),
        allowNull: false,
        defaultValue: 'pendiente',
      },
    },
    {
      sequelize,
      modelName: 'Envio',
      tableName: 'envios',
      timestamps: true,
      indexes: [
        { unique: true, fields: ['ordenId'], name: 'idx_envio_orden_unique' },
        { fields: ['estado'],                name: 'idx_envio_estado' },
      ],
    }
  );

  return Envio;
}

module.exports = { Envio, inicializar };
