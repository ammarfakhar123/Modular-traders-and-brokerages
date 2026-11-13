import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

// Import Route Handlers
import authRouter from './routes/auth';
import productsRouter from './routes/products';
import enquiriesRouter from './routes/enquiries';
import settingsRouter from './routes/settings';

const app = express();

// Enable Cross-Origin Resource Sharing with credentials support for subdomains
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin) return callback(null, true);

      // Allow any subdomains of modularagro.com, modulartraders.com, vercel.app, or localhost
      const allowedRegex = /^(https?:\/\/(?:[a-zA-Z0-9-]+\.)*(?:modularagro\.com|modulartraders\.com|vercel\.app)|http:\/\/localhost(?::\d+)?|http:\/\/127\.0\.0\.1(?::\d+)?)$/;
      if (allowedRegex.test(origin) || origin.includes('localhost') || origin.includes('127.0.0.1')) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive for universal API consumption
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API Health & Status Endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Modular Traders and Brokerage Serverless API',
    karachiTime: new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' }),
    version: '2.0.0',
    env: process.env.NODE_ENV || 'production',
  });
});

app.get('/api', (_req: Request, res: Response) => {
  res.json({
    name: 'Modular Traders & Brokerage B2B Commodity API',
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      enquiries: '/api/enquiries',
      auth: '/api/auth',
      settings: '/api/settings',
    },
  });
});

// Mount Routes
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/enquiries', enquiriesRouter);
app.use('/api/settings', settingsRouter);

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[API Unhandled Error]', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error occurred.',
  });
});

// Export Express app as Vercel Serverless Function handler
export default app;
