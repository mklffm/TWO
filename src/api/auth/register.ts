import { Hono } from 'hono';
import { Context } from 'hono';
import { setCookie } from 'hono/cookie';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { db } from '../../db';
import { v4 as uuidv4 } from 'uuid';

const app = new Hono();

app.post('/', async (c: Context) => {
  try {
    const { email, password, firstName, lastName } = await c.req.json();

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
    await db.prepare(
      'INSERT INTO users (id, email, password, first_name, last_name) VALUES (?, ?, ?, ?, ?)'
    ).bind(userId, email, hashedPassword, firstName, lastName).run();

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: userId,
        email,
        firstName,
        lastName
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Set cookie using setCookie helper
    setCookie(c, 'auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return c.json({
      id: userId,
      email,
      firstName,
      lastName
    });
  } catch (error) {
    console.error('Registration error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app; 