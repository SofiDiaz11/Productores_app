"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const errorHandler_1 = require("./middleware/errorHandler");
const routes_1 = __importDefault(require("./routes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
// Configurar variables de entorno PRIMERO
dotenv_1.default.config();
const app = (0, express_1.default)();
// Test de conexión a base de datos
(0, database_1.testConnection)();
// Middleware de seguridad
app.use((0, helmet_1.default)());
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutos
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // 100 requests
    message: 'Demasiadas solicitudes, intenta de nuevo más tarde.',
});
app.use('/api', limiter);
// CORS configurado
const allowedOrigins = ((_a = process.env.ALLOWED_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(',')) || ['http://localhost:3000'];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true,
}));
// Body parsing
app.use(express_1.default.json({
    limit: process.env.MAX_FILE_SIZE || '10mb'
}));
app.use(express_1.default.urlencoded({
    extended: true,
    limit: process.env.MAX_FILE_SIZE || '10mb'
}));
// Logging en desarrollo usando el middleware mejorado
app.use(errorHandler_1.requestLogger);
// Configurar rutas de autenticación ANTES de las rutas principales
app.use('/api/auth', authRoutes_1.default);
// Rutas principales después de auth
app.use('/', routes_1.default);
// Los middlewares de error siempre van AL FINAL
app.use(errorHandler_1.notFound);
app.use(errorHandler_1.errorHandler);
// Log de rutas registradas en desarrollo
if (process.env.NODE_ENV === 'development') {
    console.log('🛣️  Rutas registradas:');
    console.log('   POST /api/auth/register');
    console.log('   POST /api/auth/login');
}
exports.default = app;
