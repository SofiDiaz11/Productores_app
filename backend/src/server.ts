import app from './app';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
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