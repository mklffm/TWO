import { Hono } from 'hono';
import * as bcrypt from 'bcryptjs';
import jwt from '@tsndr/cloudflare-worker-jwt';

// @ts-ignore - Simplified for build
const app = new Hono();

app.post('/', async (c: any) => {
  try {
    const { email, password } = await c.req.json();
    
    // @ts-ignore - Using any type to get past build errors
    const db = c.env?.DB;
    
    if (!db) {
      return c.json({ error: 'Database environment not available' }, 500);
    }

    // Get user from database
    const user = await db.prepare(
      'SELECT * FROM users WHERE email = ?'
    ).bind(email).first();

    if (!user) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password as string);
    if (!isValidPassword) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Generate JWT token
    const token = await jwt.sign(
      { 
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name
      },
      c.env?.JWT_SECRET || 'your-secret-key'
    );

    return c.json({
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app; 