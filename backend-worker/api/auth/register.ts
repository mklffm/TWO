import { Hono } from 'hono';
import * as bcrypt from 'bcryptjs';
import jwt from '@tsndr/cloudflare-worker-jwt';
import { v4 as uuidv4 } from 'uuid';

// @ts-ignore - Simplified for build
const app = new Hono();

app.post('/', async (c: any) => {
  try {
    const { email, password, firstName, lastName } = await c.req.json();
    // @ts-ignore - Using any type to get past build errors
    const db = c.env?.DB as any;
    if (!db) {
      throw new Error('Database connection not available');
    }
    // Check if user already exists
    const existingUser = await db.prepare(
      'SELECT * FROM users WHERE email = ?'
    ).bind(email).first();

    if (existingUser) {
      return c.json({ error: 'Email already registered' }, 400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const userId = uuidv4();
    const stmt = await db.prepare(
      'INSERT INTO users (id, email, password, first_name, last_name) VALUES (?, ?, ?, ?, ?)'
    ).bind(userId, email, hashedPassword, firstName, lastName);
    await stmt.run();

    // Generate JWT token
    const token = await jwt.sign(
      { 
        id: userId,
        email,
        firstName,
        lastName
      },
      c.env?.JWT_SECRET || 'your-secret-key'
    );

    return c.json({
      id: userId,
      email,
      firstName,
      lastName,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app; 