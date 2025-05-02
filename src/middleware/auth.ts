import { Hono } from 'hono';
import { Context } from 'hono';
import jwt from 'jsonwebtoken';
import { db } from '../db';

export const authMiddleware = new Hono();

authMiddleware.use('*', async (c: Context, next) => {
  try {
    const token = c.req.cookie('auth_token');

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
}); 