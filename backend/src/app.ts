import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { testConnection } from './config/database';
import { errorHandler, notFound, requestLogger } from './middleware/errorHandler';
import indexRouter from './routes';
import authRoutes from './routes/authRoutes'; 

// Configurar variables de entorno PRIMERO
dotenv.config();

const app = express();

// Test de conexión a base de datos
testConnection();

// Middleware de seguridad
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // 100 requests
  message: 'Demasiadas solicitudes, intenta de nuevo más tarde.',
});
app.use('/api', limiter);

// CORS configurado
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
app.use(cors({
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
}));

// Body parsing
app.use(express.json({ 
  limit: process.env.MAX_FILE_SIZE || '10mb' 
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: process.env.MAX_FILE_SIZE || '10mb' 
}));

// Logging middleware
app.use(requestLogger);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/', indexRouter);

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
