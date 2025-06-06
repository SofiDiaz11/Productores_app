"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 5000;
const server = app_1.default.listen(PORT, () => {
    console.log('🚀 ===================================');
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`📊 Entorno: ${process.env.NODE_ENV}`);
    console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🗄️ Prisma Studio: npx prisma studio`);
    console.log('🚀 ===================================');
});
// Manejo graceful de cierre del servidor
process.on('SIGTERM', () => {
    console.log('SIGTERM recibido');
    server.close(() => {
        console.log('Servidor cerrado');
    });
});
process.on('SIGINT', () => {
    console.log('SIGINT recibido');
    server.close(() => {
        console.log('Servidor cerrado');
    });
});
