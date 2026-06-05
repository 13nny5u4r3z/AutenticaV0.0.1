'use strict';

/**
 * src/models/index.js
 *
 * Punto central de modelos Sequelize.
 * 1. Importa la conexión configurada.
 * 2. Inicializa cada modelo pasándole la instancia de sequelize.
 * 3. Llama al método estático `asociar` de cada modelo para definir relaciones.
 * 4. Exporta sequelize + todos los modelos.
 */

const sequelize = require('../src/config/database');

// ── Importar funciones de inicialización ────────────────────────────────────
const { Usuario, inicializar: initUsuario } = require('./Usuario');
const { Servicio, inicializar: initServicio } = require('./Servicio');
const { Producto, inicializar: initProducto } = require('./Producto');
const { HorarioDisponible, inicializar: initHorario } = require('./HorarioDisponible');
const { Cita, inicializar: initCita } = require('./Cita');
const { Orden, inicializar: initOrden } = require('./Orden');
const { DetalleOrden, inicializar: initDetalleOrden } = require('./DetalleOrden');
const { Envio, inicializar: initEnvio } = require('./Envio');
const { Carrito, inicializar: initCarrito } = require('./Carrito');
const { Favorito, inicializar: initFavorito } = require('./Favorito');

// ── 1. Inicializar modelos (cada uno recibe la instancia de sequelize) ──────
initUsuario(sequelize);
initServicio(sequelize);
initProducto(sequelize);
initHorario(sequelize);
initCita(sequelize);
initOrden(sequelize);
initDetalleOrden(sequelize);
initEnvio(sequelize);
initCarrito(sequelize);
initFavorito(sequelize);

// ── 2. Mapa de modelos para pasar a cada método asociar() ───────────────────
const modelos = {
  Usuario,
  Servicio,
  Producto,
  HorarioDisponible,
  Cita,
  Orden,
  DetalleOrden,
  Envio,
  Carrito,
  Favorito,
};

// ── 3. Definir asociaciones ─────────────────────────────────────────────────
//
// El orden importa: primero los modelos "padre" (sin FK hacia otros),
// luego los que dependen de ellos.
//
Usuario.asociar(modelos);
Servicio.asociar(modelos);
Producto.asociar(modelos);
HorarioDisponible.asociar(modelos);
Cita.asociar(modelos);
Orden.asociar(modelos);
DetalleOrden.asociar(modelos);
Envio.asociar(modelos);
Carrito.asociar(modelos);
Favorito.asociar(modelos);

// ── 4. Exportar todo ────────────────────────────────────────────────────────
module.exports = {
  sequelize,
  ...modelos,
};
