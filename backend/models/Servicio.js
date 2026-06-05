'use strict';

const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class Servicio extends Model {
  static asociar(modelos) {
    Servicio.hasMany(modelos.Cita,         { foreignKey: 'servicioId', as: 'citas' });
    Servicio.hasMany(modelos.DetalleOrden, { foreignKey: 'servicioId', as: 'detallesOrden' });
    Servicio.hasMany(modelos.Carrito,      { foreignKey: 'servicioId', as: 'enCarritos' });
    Servicio.hasMany(modelos.Favorito,     { foreignKey: 'servicioId', as: 'enFavoritos' });
  }
}

function inicializar(sequelize) {
  Servicio.init(
    {
      id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: () => uuidv4(),
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'El nombre del servicio no puede estar vacío' },
        },
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: { args: [0], msg: 'El precio no puede ser negativo' },
          isDecimal: { msg: 'El precio debe ser un número decimal válido' },
        },
      },
      modalidad: {
        type: DataTypes.ENUM('presencial', 'en_linea'),
        allowNull: false,
      },
      imagen_url: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: { msg: 'La URL de imagen no es válida' },
        },
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      duracionMinutos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 60,
        validate: {
          min: { args: [15], msg: 'La duración mínima es de 15 minutos' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Servicio',
      tableName: 'servicios',
      timestamps: true,
    }
  );

  return Servicio;
}

module.exports = { Servicio, inicializar };
