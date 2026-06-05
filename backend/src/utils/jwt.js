'use strict';

const jwt = require('jsonwebtoken');

function signAccessToken(payload) {
    const secret = process.env.JWT_SECRET || 'jwt_secret';
    return jwt.sign(payload, secret, { expiresIn: process.env.JWT_EXPIRES_IN || '15m' });
}

function signRefreshToken(payload) {
    const secret = process.env.JWT_REFRESH_SECRET || 'jwt_refresh_secret';
    return jwt.sign(payload, secret, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' });
}

function verifyRefreshToken(token) {
    const secret = process.env.JWT_REFRESH_SECRET || 'jwt_refresh_secret';
    return jwt.verify(token, secret);
}

module.exports = { signAccessToken, signRefreshToken, verifyRefreshToken };
