'use strict';

require('dotenv').config();
const { Sequelize } = require('sequelize');

const esProd = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    dialect: 'mysql',

    // Logging: desactivado en producción
    logging: esProd ? false : console.log,

    // Zona horaria para México
    timezone: 'America/Mexico_City',

    dialectOptions: {
      charset: 'utf8mb4',
      // Permite leer tipos DATE/DATETIME como strings (evita conversión automática de Node)
      dateStrings: true,
      typeCast: true,
    },

    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      // Sequelize agrega createdAt y updatedAt por defecto
      timestamps: true,
      underscored: false,
    },

    pool: {
      min: parseInt(process.env.DB_POOL_MIN, 10) || 2,
      max: parseInt(process.env.DB_POOL_MAX, 10) || 10,
      acquire: parseInt(process.env.DB_POOL_ACQUIRE, 10) || 30000,
      idle: parseInt(process.env.DB_POOL_IDLE, 10) || 10000,
    },
  }
);

module.exports = sequelize;
