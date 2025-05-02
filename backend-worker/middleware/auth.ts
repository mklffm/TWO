import { Hono } from 'hono';
import jwt from '@tsndr/cloudflare-worker-jwt';

export const authMiddleware = new Hono();

authMiddleware.use('*', async (c, next) => {
  try {
    // Get token from Authorization header
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    const token = authHeader.replace('Bearer ', '');

    // Verify JWT token
    const valid = await jwt.verify(token, (c.env && c.env.JWT_SECRET) || 'your-secret-key');
    if (!valid) {
      return c.json({ error: 'Invalid token' }, 401);
    }
    const payload = jwt.decode(token).payload as any;
    const db = c.env.DB;

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