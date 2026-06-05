'use strict';

const bcrypt = require('bcryptjs');
const { Usuario } = require('../../models');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../utils/jwt');
const { enviarEmail } = require('../config/email');
const { AppError } = require('../utils/errors');
const { successResponse } = require('../utils/response');
const logger = require('../utils/logger');

function buildUsuarioResponse(usuario) {
    return {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
    };
}

function generarCodigoRecuperacion() {
    return String(Math.floor(100000 + Math.random() * 900000));
}

async function register(req, res, next) {
    try {
        const { nombre, email, password } = req.body;

        const emailNormalizado = String(email).trim().toLowerCase();
        const usuarioExistente = await Usuario.findOne({ where: { email: emailNormalizado } });
        if (usuarioExistente) {
            throw new AppError('No se puede completar el registro con estos datos', 409);
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const usuario = await Usuario.create({
            nombre: String(nombre).trim(),
            email: emailNormalizado,
            password: passwordHash,
            rol: 'cliente',
        });

        try {
            await enviarEmail(
                usuario.email,
                'Bienvenido a Asesorías de Imagen',
                `<p>Hola ${usuario.nombre},</p><p>Gracias por registrarte en nuestra plataforma de asesorías de imagen.</p><p>Nos alegra tenerte con nosotros.</p>`
            );
        } catch (emailError) {
            logger.warn('No se pudo enviar el correo de bienvenida:', emailError.message || emailError);
        }

        return successResponse(res, { usuario: buildUsuarioResponse(usuario) }, 'Registro exitoso', 201);
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const emailNormalizado = String(email).trim().toLowerCase();

        const usuario = await Usuario.findOne({ where: { email: emailNormalizado } });
        if (!usuario) {
            throw new AppError('Credenciales inválidas', 401);
        }

        if (usuario.bloqueadoHasta && new Date(usuario.bloqueadoHasta) > new Date()) {
            throw new AppError('Cuenta bloqueada temporalmente. Intente más tarde', 423);
        }

        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) {
            usuario.intentosFallidos += 1;
            if (usuario.intentosFallidos >= 10) {
                usuario.bloqueadoHasta = new Date(Date.now() + 30 * 60 * 1000);
            }
            await usuario.save();
            throw new AppError('Credenciales inválidas', 401);
        }

        usuario.intentosFallidos = 0;
        usuario.bloqueadoHasta = null;

        const payload = buildUsuarioResponse(usuario);
        const accessToken = signAccessToken(payload);
        const refreshToken = signRefreshToken(payload);

        usuario.refreshToken = refreshToken;
        await usuario.save();

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/api/auth',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return successResponse(res, { accessToken, refreshToken, usuario: payload }, 'Inicio de sesión exitoso');
    } catch (error) {
        next(error);
    }
}

async function refreshToken(req, res, next) {
    try {
        // Leer refreshToken de cookie, body, o header
        let token = (req.cookies || {}).refreshToken || req.body?.refreshToken;

        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }

        if (!token) {
            throw new AppError('Refresh token no proporcionado', 401);
        }

        let payload;
        try {
            payload = verifyRefreshToken(token);
        } catch (verifyError) {
            throw new AppError('Refresh token inválido o expirado', 401);
        }

        const usuario = await Usuario.findOne({ where: { refreshToken: token } });
        if (!usuario) {
            throw new AppError('Refresh token inválido o expirado', 401);
        }

        const usuarioPayload = buildUsuarioResponse(usuario);
        const nuevoAccessToken = signAccessToken(usuarioPayload);
        const nuevoRefreshToken = signRefreshToken(usuarioPayload);

        usuario.refreshToken = nuevoRefreshToken;
        await usuario.save();

        res.cookie('refreshToken', nuevoRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/api/auth',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return successResponse(res, { accessToken: nuevoAccessToken, refreshToken: nuevoRefreshToken }, 'Token renovado correctamente');
    } catch (error) {
        next(error);
    }
}

async function logout(req, res, next) {
    try {
        const usuario = await Usuario.findByPk(req.usuario.id);
        if (!usuario) {
            throw new AppError('No autorizado', 401);
        }

        usuario.refreshToken = null;
        await usuario.save();

        res.clearCookie('refreshToken', {
            path: '/api/auth',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        return successResponse(res, null, 'Sesión cerrada exitosamente');
    } catch (error) {
        next(error);
    }
}

async function recuperar(req, res, next) {
    try {
        const { email } = req.body;
        const emailNormalizado = String(email).trim().toLowerCase();
        const usuario = await Usuario.findOne({ where: { email: emailNormalizado } });

        if (usuario) {
            const codigo = generarCodigoRecuperacion();
            usuario.codigoRecuperacion = codigo;
            usuario.codigoRecuperacionExpiracion = new Date(Date.now() + 10 * 60 * 1000);
            await usuario.save();

            try {
                await enviarEmail(
                    usuario.email,
                    'Código de recuperación de contraseña',
                    `<p>Hola ${usuario.nombre},</p><p>Tu código para recuperar la contraseña es: <strong>${codigo}</strong></p><p>El código expira en 10 minutos.</p>`
                );
            } catch (emailError) {
                logger.warn('No se pudo enviar el correo de recuperación:', emailError.message || emailError);
            }
        }

        return successResponse(res, null, 'Si el correo está registrado, recibirás un código de verificación');
    } catch (error) {
        next(error);
    }
}

async function verificarCodigo(req, res, next) {
    try {
        const { email, codigo, nuevoPassword } = req.body;
        const emailNormalizado = String(email).trim().toLowerCase();

        const usuario = await Usuario.findOne({ where: { email: emailNormalizado } });
        if (
            !usuario ||
            !usuario.codigoRecuperacion ||
            usuario.codigoRecuperacion !== String(codigo).trim() ||
            !usuario.codigoRecuperacionExpiracion ||
            new Date(usuario.codigoRecuperacionExpiracion) < new Date()
        ) {
            throw new AppError('Código inválido o expirado', 400);
        }

        usuario.password = await bcrypt.hash(nuevoPassword, 12);
        usuario.codigoRecuperacion = null;
        usuario.codigoRecuperacionExpiracion = null;
        usuario.intentosFallidos = 0;
        usuario.bloqueadoHasta = null;
        usuario.refreshToken = null;
        await usuario.save();

        return successResponse(res, null, 'Contraseña actualizada exitosamente');
    } catch (error) {
        next(error);
    }
}

async function perfil(req, res, next) {
    try {
        return successResponse(res, { usuario: req.usuario }, 'Perfil obtenido correctamente');
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login,
    refreshToken,
    logout,
    recuperar,
    verificarCodigo,
    perfil,
};
