'use strict';

function successResponse(res, data = null, message = 'Operación exitosa', statusCode = 200) {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
}

function errorResponse(res, message = 'Error interno del servidor', statusCode = 500) {
    return res.status(statusCode).json({
        success: false,
        message,
        data: null,
    });
}

module.exports = { successResponse, errorResponse };
