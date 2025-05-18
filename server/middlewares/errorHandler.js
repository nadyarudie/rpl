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
        status = err.status || 400; // Use err.status if available
    }

    if (err.name === 'UnauthorizedError') {
        status = err.status || 401; //  Use err.status if available
    }
    if (err.name === 'NotFoundError') {
        status = err.status || 404; // Use err.status if available
    }

    //  Handle database errors (example: duplicate entry)
    if (err.code === 'ER_DUP_ENTRY') {
        status = 409;
        err.message = 'Duplicate entry';
    }
    //  Handle connection errors
    if (err.code === 'ECONNREFUSED') {
        status = 503;
        err.message = 'Database connection refused';
    }

    res.status(status).json({
        error: {
            message: err.message || 'Internal Server Error',
            details: err.details || err.errors || undefined
        }
    });
};