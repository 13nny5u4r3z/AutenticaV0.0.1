'use strict';

const { body, validationResult } = require('express-validator');
const { BadRequestError } = require('../utils/errors');

function handleValidation(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const mensajes = errors.array().map((error) => error.msg);
        return next(new BadRequestError(mensajes.join('. ')));
    }
    next();
}

const validateRegistro = [
    body('nombre')
        .trim()
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isLength({ min: 2 })
        .withMessage('El nombre debe tener al menos 2 caracteres'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('El correo es obligatorio')
        .isEmail()
        .withMessage('El correo no es válido')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres'),
    handleValidation,
];

const validateLogin = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('El correo es obligatorio')
        .isEmail()
        .withMessage('El correo no es válido')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria'),
    handleValidation,
];

const validateRecuperar = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('El correo es obligatorio')
        .isEmail()
        .withMessage('El correo no es válido')
        .normalizeEmail(),
    handleValidation,
];

const validateCodigo = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('El correo es obligatorio')
        .isEmail()
        .withMessage('El correo no es válido')
        .normalizeEmail(),
    body('codigo')
        .trim()
        .notEmpty()
        .withMessage('El código es obligatorio')
        .isLength({ min: 6, max: 6 })
        .withMessage('El código debe tener 6 dígitos')
        .isNumeric()
        .withMessage('El código debe ser numérico'),
    body('nuevoPassword')
        .notEmpty()
        .withMessage('La nueva contraseña es obligatoria')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres'),
    handleValidation,
];

module.exports = {
    validateRegistro,
    validateLogin,
    validateRecuperar,
    validateCodigo,
};
