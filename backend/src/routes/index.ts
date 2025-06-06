import { Router } from 'express';
import { testConnection } from '../config/database';

const router = Router();

// Ruta principal
router.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Productores API v1.0',
    status: 'online',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// Health check con información de BD
router.get('/api/health', async (req, res) => {
  try {
    await testConnection();
    
    res.json({ 
      success: true,
      message: 'Productores API funcionando! 🚀',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      database: 'connected',
      version: '1.0.0',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error de conexión a base de datos',
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
