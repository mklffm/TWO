import { Context, Next } from 'hono';
import jwt from 'jsonwebtoken';
import { getCookie } from 'hono/cookie';
import { db } from '../db';

// Convert to a middleware function instead of a Hono instance
export async function authMiddleware(c: Context, next: Next) {
  try {
    const token = getCookie(c, 'auth_token');

    if (!token) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Verify JWT token
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    };

    if (!payload) {
      return c.json({ error: 'Invalid token' }, 401);
    }

    // Get user from database
    const user = await db.prepare(
      'SELECT * FROM users WHERE id = ?'
    ).bind(payload.id).first();

    if (!user) {
      return c.json({ error: 'User not found' }, 401);
    }

    // Add user to context
    c.set('user', {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name
    });

    await next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return c.json({ error: 'Unauthorized' }, 401);
  }
} 