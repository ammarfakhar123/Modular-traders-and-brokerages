import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

// Import Route Handlers
import authRouter from './routes/auth';
import productsRouter from './routes/products';
import enquiriesRouter from './routes/enquiries';
import settingsRouter from './routes/settings';

const app = express();

// =============================================================================
// WEB APPLICATION FIREWALL (WAF) & MALICIOUS BOT PROTECTION
// =============================================================================

// 1. Sliding Window In-Memory Rate Limiting (Prevent DoS & Scraping Floods)
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 150; // generous for genuine traffic, stops scrapers

const rateLimitMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : (req.socket?.remoteAddress || 'unknown');
  const now = Date.now();

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }

  record.count += 1;
  if (record.count > MAX_REQUESTS_PER_WINDOW) {
    res.setHeader('Retry-After', '60');
    return res.status(429).json({
      success: false,
      error: 'Rate limit exceeded. Too many requests from your IP. Please try again in 1 minute.',
      firewall: 'Modular-WAF-Active',
    });
  }

  next();
};

// 2. Exploit Scanner & Malicious Bot Defense Middleware
const MALICIOUS_USER_AGENT_PATTERN = /(sqlmap|nikto|masscan|wprecon|acunetix|dirbuster|nmap|zgrab|gobuster|fuzz|shodan|censys|havij|netsparker|vuln|morfeus|nessus|arachni)/i;

const botFirewallMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const ua = req.headers['user-agent'] || '';

  // Block known penetration testing / vulnerability exploit bots
  if (MALICIOUS_USER_AGENT_PATTERN.test(ua)) {
    return res.status(403).json({
      success: false,
      error: 'Access blocked by Modular Security Firewall. Malicious activity signature detected.',
      firewall: 'Modular-WAF-Blocked',
    });
  }

  // Set hardened security headers on all API responses
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Security-Firewall', 'Active (Modular Agro Defense v2.4)');

  next();
};

app.use(botFirewallMiddleware);
app.use(rateLimitMiddleware);

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
