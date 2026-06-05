'use strict';

const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

async function enviarEmail(destinatario, asunto, html) {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
            to: destinatario,
            subject: asunto,
            html,
        });
    } catch (error) {
        logger.error(`Error enviando email a ${destinatario}: ${error.message || error}`);
        throw error;
    }
}

module.exports = { enviarEmail };
