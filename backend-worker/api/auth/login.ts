import { Hono } from 'hono';
import * as bcrypt from 'bcryptjs';
import jwt from '@tsndr/cloudflare-worker-jwt';

// @ts-ignore - Simplified for build
const app = new Hono();

app.post('/', async (c: any) => {
  try {
    console.log('Login endpoint called');
    
    // Parse the request body
    const { email, password } = await c.req.json();
    console.log('Login attempt for:', email);
    
    // Get database connection
    // @ts-ignore - Using any type to get past build errors
    const db = c.env?.DB;
    
    if (!db) {
      console.error('Database environment not available');
      return c.json({ error: 'Database environment not available' }, 500);
    }

    try {
      // Get user from database
      const user = await db.prepare(
        'SELECT * FROM users WHERE email = ?'
      ).bind(email).first();

      if (!user) {
        console.log('User not found:', email);
        return c.json({ error: 'Invalid credentials' }, 401);
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password as string);
      if (!isValidPassword) {
        console.log('Invalid password for user:', email);
        return c.json({ error: 'Invalid credentials' }, 401);
      }

      console.log('User authenticated successfully:', email);

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
    } catch (dbError) {
      console.error('Database error during login:', dbError);
      return c.json({ error: 'Database operation failed', details: String(dbError) }, 500);
    }
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: 'Internal server error', details: String(error) }, 500);
  }
});

export default app; 