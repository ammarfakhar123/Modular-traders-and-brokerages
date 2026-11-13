import { Request, Response, NextFunction } from 'express';

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const ipSubmissions = new Map<string, RateLimitRecord>();

const WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_REQUESTS = 10; // Max 10 inquiries per IP in 5 minutes

export function enquiryRateLimiter(req: Request, res: Response, next: NextFunction) {
  // Honeypot field check (spam protection)
  const honeypot = (req.body as any)?.website || (req.body as any)?._hp;
  if (honeypot) {
    // Silently return success to fool bots without writing spam or sending emails
    return res.status(200).json({
      success: true,
      message: 'Inquiry processed.',
    });
  }

  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    'unknown';

  const now = Date.now();
  const record = ipSubmissions.get(clientIp);

  if (!record || now > record.resetAt) {
    ipSubmissions.set(clientIp, { count: 1, resetAt: now + WINDOW_MS });
    return next();
  }

  if (record.count >= MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      error: 'Too many submissions. Please wait a few minutes before submitting another trade inquiry.',
    });
  }

  record.count += 1;
  return next();
}
