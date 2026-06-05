'use strict';

const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class Favorito extends Model {
  static asociar(modelos) {
    Favorito.belongsTo(modelos.Usuario,  { foreignKey: 'usuarioId',  as: 'usuario' });
    Favorito.belongsTo(modelos.Producto, { foreignKey: 'productoId', as: 'producto' });
    Favorito.belongsTo(modelos.Servicio, { foreignKey: 'servicioId', as: 'servicio' });
  }
}

function inicializar(sequelize) {
  Favorito.init(
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
        comment: 'Nulo si el favorito es un servicio',
      },
      servicioId: {
        type: DataTypes.CHAR(36),
        allowNull: true,
        defaultValue: null,
        references: { model: 'servicios', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        comment: 'Nulo si el favorito es un producto',
      },
    },
    {
      sequelize,
      modelName: 'Favorito',
      tableName: 'favoritos',
      timestamps: true,
      indexes: [
        { fields: ['usuarioId'],  name: 'idx_favorito_usuario' },
        { fields: ['productoId'], name: 'idx_favorito_producto' },
        { fields: ['servicioId'], name: 'idx_favorito_servicio' },
      ],
    }
  );

  return Favorito;
}

module.exports = { Favorito, inicializar };
