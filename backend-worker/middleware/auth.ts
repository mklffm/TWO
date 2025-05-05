import { Hono } from 'hono';
import { Context, Next } from 'hono';
import jwt from '@tsndr/cloudflare-worker-jwt';

// Interface for environment bindings
interface Bindings {
  DB: any;
  JWT_SECRET: string;
  [key: string]: any;
}

// Create middleware router with proper typing
const authMiddleware = new Hono<{ Bindings: Bindings }>();

// Authentication middleware
authMiddleware.use('*', async (c: Context, next: Next) => {
  try {
    // Get token from Authorization header
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    const token = authHeader.replace('Bearer ', '');

    // Verify JWT token
    const valid = await jwt.verify(token, c.env?.JWT_SECRET || 'your-secret-key');
    if (!valid) {
      return c.json({ error: 'Invalid token' }, 401);
    }
    const payload = jwt.decode(token).payload as any;
    
    const db = c.env?.DB;
    
    if (!db) {
      return c.json({ error: 'Database environment not available' }, 500);
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

export { authMiddleware }; 