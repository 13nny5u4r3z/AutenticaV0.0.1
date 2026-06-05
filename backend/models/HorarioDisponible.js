'use strict';

const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class HorarioDisponible extends Model {
  static asociar(modelos) {
    // Relación 1:1 con Cita (un horario solo puede pertenecer a una cita)
    HorarioDisponible.hasOne(modelos.Cita, { foreignKey: 'horarioId', as: 'cita' });
  }
}

function inicializar(sequelize) {
  HorarioDisponible.init(
    {
      id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: () => uuidv4(),
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: { msg: 'La fecha no es válida' },
          notNull: { msg: 'La fecha es obligatoria' },
        },
      },
      horaInicio: {
        type: DataTypes.TIME,
        allowNull: false,
        comment: 'Hora de inicio del bloque (formato HH:MM:SS)',
      },
      horaFin: {
        type: DataTypes.TIME,
        allowNull: false,
        comment: 'Hora de fin del bloque. Siempre = horaInicio + 1 hora',
      },
      disponible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'false cuando ya está reservado por una cita',
      },
    },
    {
      sequelize,
      modelName: 'HorarioDisponible',
      tableName: 'horarios_disponibles',
      timestamps: true,
      indexes: [
        { fields: ['fecha'], name: 'idx_horario_fecha' },
        { fields: ['disponible'], name: 'idx_horario_disponible' },
      ],
    }
  );

  return HorarioDisponible;
}

module.exports = { HorarioDisponible, inicializar };
