"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.errorHandler = exports.requestLogger = void 0;
// Utilidad para verificar si un valor es un objeto válido para logging
const isValidObject = (obj) => {
    return obj != null && typeof obj === 'object' && !Array.isArray(obj);
};
// Utilidad para extraer propiedades seguras para logging
const getSafeObjectForLogging = (obj) => {
    if (!isValidObject(obj))
        return undefined;
    const filtered = Object.entries(obj).reduce((acc, [key, value]) => {
        // Excluir propiedades sensibles o vacías
        if (value !== undefined &&
            value !== null &&
            value !== '' &&
            !key.toLowerCase().includes('password') &&
            !key.toLowerCase().includes('token')) {
            acc[key] = value;
        }
        return acc;
    }, {});
    return Object.keys(filtered).length > 0 ? filtered : undefined;
};
// Middleware de logging mejorado
const requestLogger = (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        const logData = {
            timestamp: new Date().toISOString(),
            method: req.method,
            path: req.path,
            body: getSafeObjectForLogging(req.body),
            query: getSafeObjectForLogging(req.query),
            params: getSafeObjectForLogging(req.params),
            ip: req.ip,
            userAgent: req.get('user-agent'),
        };
        // Filtrar propiedades undefined para un log más limpio
        const cleanLogData = Object.entries(logData).reduce((acc, [key, value]) => {
            if (value !== undefined) {
                acc[key] = value;
            }
            return acc;
        }, {});
        console.log('📝 Request:', JSON.stringify(cleanLogData, null, 2));
    }
    next();
};
exports.requestLogger = requestLogger;
const errorHandler = (err, req, res, next) => {
    const { statusCode = 500, message } = err;
    console.error('🚨 Error:', {
        message,
        statusCode,
        stack: err.stack,
        url: req.url,
        method: req.method,
    });
    res.status(statusCode).json(Object.assign({ success: false, message: process.env.NODE_ENV === 'production'
            ? 'Algo salió mal'
            : message }, (process.env.NODE_ENV === 'development' && { stack: err.stack })));
};
exports.errorHandler = errorHandler;
const notFound = (req, res, next) => {
    const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};
exports.notFound = notFound;
