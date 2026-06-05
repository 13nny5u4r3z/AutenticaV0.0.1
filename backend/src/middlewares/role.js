'use strict';

const { AppError } = require('../utils/errors');

function authorize(...roles) {
    return (req, res, next) => {
        if (!req.usuario) {
            return next(new AppError('No autorizado', 401));
        }

        if (!roles.includes(req.usuario.rol)) {
            return next(new AppError('No tienes permisos para acceder a este recurso', 403));
        }

        next();
    };
}

module.exports = { authorize };
