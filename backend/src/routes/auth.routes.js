'use strict';

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { requireAuth } = require('../middlewares/auth');
const { loginLimiter, recuperacionLimiter } = require('../middlewares/rateLimiter');
const {
    validateRegistro,
    validateLogin,
    validateRecuperar,
    validateCodigo,
} = require('../middlewares/validators');

router.post('/registro', validateRegistro, authController.register);
router.post('/login', loginLimiter, validateLogin, authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/logout', requireAuth, authController.logout);
router.post('/recuperar', recuperacionLimiter, validateRecuperar, authController.recuperar);
router.post('/verificar-codigo', validateCodigo, authController.verificarCodigo);
router.get('/perfil', requireAuth, authController.perfil);

module.exports = router;
