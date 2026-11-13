import { Request, Response, NextFunction } from 'express';
import { getSupabase } from '../services/supabaseService';

export interface AuthenticatedRequest extends Request {
  user?: {
    email: string;
    role: string;
    id?: string;
  };
}

const FALLBACK_ADMIN_TOKEN = process.env.ADMIN_JWT_SECRET || 'jwt-modular-admin-token-2026';

export async function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required. Missing Bearer token.',
      });
    }

    const token = authHeader.split(' ')[1];

    // Check fallback master token first
    if (token === FALLBACK_ADMIN_TOKEN) {
      req.user = {
        email: 'admin@modularagro.com',
        role: 'Super Administrator',
      };
      return next();
    }

    // Verify token with Supabase Auth
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired session token.',
      });
    }

    req.user = {
      email: data.user.email || '',
      role: data.user.role || 'authenticated',
      id: data.user.id,
    };

    return next();
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: 'Authentication verification failure.',
    });
  }
}
