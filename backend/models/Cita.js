'use strict';

const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class Cita extends Model {
  static asociar(modelos) {
    Cita.belongsTo(modelos.Usuario,          { foreignKey: 'usuarioId',  as: 'usuario' });
    Cita.belongsTo(modelos.Servicio,         { foreignKey: 'servicioId', as: 'servicio' });
    // Relación 1:1: belongsTo en el lado que tiene la FK
    Cita.belongsTo(modelos.HorarioDisponible, { foreignKey: 'horarioId', as: 'horario' });
  }
}

function inicializar(sequelize) {
  Cita.init(
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
      servicioId: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        references: { model: 'servicios', key: 'id' },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      },
      horarioId: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        unique: {
          name: 'idx_cita_horario_unique',
          msg: 'Este horario ya está reservado por otra cita',
        },
        references: { model: 'horarios_disponibles', key: 'id' },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        comment: 'Relación 1:1 con HorarioDisponible',
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: { msg: 'La fecha de la cita no es válida' },
        },
      },
      horaInicio: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      modalidad: {
        type: DataTypes.ENUM('presencial', 'en_linea'),
        allowNull: false,
      },
      estado: {
        type: DataTypes.ENUM('pendiente', 'confirmada', 'completada', 'cancelada'),
        allowNull: false,
        defaultValue: 'pendiente',
      },
    },
    {
      sequelize,
      modelName: 'Cita',
      tableName: 'citas',
      timestamps: true,
      indexes: [
        { fields: ['usuarioId'],  name: 'idx_cita_usuario' },
        { fields: ['servicioId'], name: 'idx_cita_servicio' },
        { fields: ['fecha'],      name: 'idx_cita_fecha' },
        { fields: ['estado'],     name: 'idx_cita_estado' },
        { unique: true, fields: ['horarioId'], name: 'idx_cita_horario_unique' },
      ],
    }
  );

  return Cita;
}

module.exports = { Cita, inicializar };
