'use strict';

const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');

const logsDir = path.resolve(__dirname, '..', '..', 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

const logFormat = format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

const logger = createLogger({
    level: process.env.LOG_LEVEL || 'debug',
    format: format.combine(format.timestamp(), logFormat),
    transports: [
        new transports.File({ filename: path.join(logsDir, 'error.log'), level: 'error' }),
        new transports.File({ filename: path.join(logsDir, 'combined.log') }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new transports.Console({
            format: format.combine(format.colorize(), format.timestamp(), logFormat),
        })
    );
}

module.exports = logger;
