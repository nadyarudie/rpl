// server/middlewares/errorHandler.js
const winston = require('winston');

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    defaultMeta: { service: 'cashil-api' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console()
    ]
});

module.exports = (err, req, res, next) => {
    logger.error({
        message: err.message,
        stack: err.stack,
        ...err
    });

    let status = err.status || 500;
    if (err.name === 'ValidationError') {
        status = 400;
    }

    if (err.name === 'UnauthorizedError') {
        status = 401;
    }
    if (err.name === 'NotFoundError') {
        status = 404;
    }

    res.status(status).json({
        error: {
            message: err.message || 'Internal Server Error',
            details: err.details || err.errors || undefined
        }
    });
};