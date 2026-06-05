'use strict';

require('dotenv').config();

const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const rateLimit  = require('express-rate-limit');

const app = express();

// ── Seguridad de cabeceras HTTP ──────────────────────────────────────────────
app.use(helmet());

// ── CORS ─────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// ── Rate limiting global ──────────────────────────────────────────────────────
const limitadorGlobal = rateLimit({
  windowMs : (parseInt(process.env.RATE_LIMIT_WINDOW, 10) || 15) * 60 * 1000,
  max      : parseInt(process.env.RATE_LIMIT_MAX, 10) || 100,
  standardHeaders: true,
  legacyHeaders:   false,
  message: {
    ok      : false,
    mensaje : 'Demasiadas solicitudes. Por favor intenta de nuevo más tarde.',
  },
});
app.use(limitadorGlobal);

// ── Parsers ───────────────────────────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.status(200).json({
    ok      : true,
    entorno : process.env.NODE_ENV || 'development',
    hora    : new Date().toISOString(),
    mensaje : 'Servidor de Asesorías de Imagen funcionando correctamente ✅',
  });
});

// ── Placeholder de rutas futuras ──────────────────────────────────────────────
// app.use('/api/v1/auth',      require('./routes/auth'));
// app.use('/api/v1/usuarios',  require('./routes/usuarios'));
// app.use('/api/v1/servicios', require('./routes/servicios'));
// app.use('/api/v1/productos', require('./routes/productos'));
// app.use('/api/v1/horarios',  require('./routes/horarios'));
// app.use('/api/v1/citas',     require('./routes/citas'));
// app.use('/api/v1/ordenes',   require('./routes/ordenes'));
// app.use('/api/v1/carrito',   require('./routes/carrito'));
// app.use('/api/v1/favoritos', require('./routes/favoritos'));

// ── Manejador de rutas no encontradas ─────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ ok: false, mensaje: 'Ruta no encontrada' });
});

// ── Manejador global de errores ───────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[Error global]', err);
  res.status(err.status || 500).json({
    ok      : false,
    mensaje : err.message || 'Error interno del servidor',
  });
});

module.exports = app;
