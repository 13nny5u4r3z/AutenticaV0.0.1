'use strict';

const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class Producto extends Model {
  static asociar(modelos) {
    Producto.hasMany(modelos.DetalleOrden, { foreignKey: 'productoId', as: 'detallesOrden' });
    Producto.hasMany(modelos.Carrito,      { foreignKey: 'productoId', as: 'enCarritos' });
    Producto.hasMany(modelos.Favorito,     { foreignKey: 'productoId', as: 'enFavoritos' });
  }
}

function inicializar(sequelize) {
  Producto.init(
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
          notEmpty: { msg: 'El nombre del producto no puede estar vacío' },
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
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: { args: [0], msg: 'El stock no puede ser negativo' },
          isInt:  { msg: 'El stock debe ser un número entero' },
        },
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
    },
    {
      sequelize,
      modelName: 'Producto',
      tableName: 'productos',
      timestamps: true,
      hooks: {
        /**
         * Antes de actualizar: si el nuevo stock es negativo, lanzar error.
         * Previene dejar stock en números negativos ante cualquier actualización.
         */
        beforeUpdate: (producto) => {
          if (producto.changed('stock') && producto.stock < 0) {
            throw new Error('El stock del producto no puede ser negativo');
          }
        },
        /**
         * También validar en creación
         */
        beforeCreate: (producto) => {
          if (producto.stock < 0) {
            throw new Error('El stock inicial del producto no puede ser negativo');
          }
        },
      },
    }
  );

  return Producto;
}

module.exports = { Producto, inicializar };
