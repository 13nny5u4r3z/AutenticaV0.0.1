'use strict';

const { ValidationError } = require('sequelize');
const { AppError } = require('../utils/errors');
const logger = require('../utils/logger');

function errorHandler(err, req, res, _next) {
    let statusCode = 500;
    let message = 'Error interno del servidor';

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    } else if (err instanceof ValidationError) {
        statusCode = 400;
        message = err.errors.map((error) => error.message).join('. ');
    }

    logger.error(err.stack || err.message || err);

    const errorPayload = {
        success: false,
        message,
    };

    if (process.env.NODE_ENV !== 'production') {
        errorPayload.error = err.stack || err;
    }

    return res.status(statusCode).json(errorPayload);
}

module.exports = errorHandler;
