'use strict';

const jwt = require('jsonwebtoken');
const { Usuario } = require('../../models');
const { AppError } = require('../utils/errors');

async function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new AppError('Token de autorización no proporcionado', 401));
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret');
        const usuario = await Usuario.findByPk(payload.id);
        if (!usuario) {
            return next(new AppError('Token inválido o expirado', 401));
        }

        req.usuario = {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol,
        };

        return next();
    } catch (error) {
        return next(new AppError('Token inválido o expirado', 401));
    }
}

module.exports = { requireAuth };
