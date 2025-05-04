import { Hono } from 'hono';
import * as bcrypt from 'bcryptjs';
import jwt from '@tsndr/cloudflare-worker-jwt';
import { v4 as uuidv4 } from 'uuid';

// @ts-ignore - Simplified for build
const app = new Hono();

app.post('/', async (c: any) => {
  // Outer try-catch to guarantee JSON response even for unexpected errors
  try {
    console.log('Registration endpoint called');
    
    // Parse the request body
    const { email, password, firstName, lastName } = await c.req.json();
    console.log('Received registration data for:', email);
    
    // Get database connection
    // @ts-ignore - Using any type to get past build errors
    const db = c.env?.DB;
    if (!db) {
      console.error('Database connection not available');
      return c.json({ error: 'Database connection not available' }, 500);
    }
    
    // Inner try-catch for specific database/logic errors
    try {
      // Check if user already exists
      const existingUser = await db.prepare(
        'SELECT * FROM users WHERE email = ?'
      ).bind(email).first();

      if (existingUser) {
        console.log('Email already registered:', email);
        return c.json({ error: 'Email already registered' }, 400);
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Password hashed successfully');

      // Create new user
      const userId = uuidv4();
      
      try {
        const stmt = await db.prepare(
          'INSERT INTO users (id, email, password, first_name, last_name) VALUES (?, ?, ?, ?, ?)'
        ).bind(userId, email, hashedPassword, firstName, lastName);
        await stmt.run();
        console.log('User created successfully with ID:', userId);
      } catch (dbInsertError) {
        console.error('Database insert error:', dbInsertError);
        return c.json({ error: 'Failed to create user account in database', details: String(dbInsertError) }, 500);
      }

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
      
      console.log('JWT token generated for user');

      // Return success response
      return c.json({
        id: userId,
        email,
        firstName,
        lastName,
        token
      });
    } catch (dbLogicError) {
      console.error('Database/Logic error:', dbLogicError);
      return c.json({ error: 'Database operation or logic failed', details: String(dbLogicError) }, 500);
    }
  } catch (error: any) {
    // Catch ANY error during the request processing (e.g., parsing body, unexpected issues)
    console.error('Unhandled Registration Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during registration';
    // Ensure a JSON response even for unexpected errors
    return c.json({ error: 'Registration failed due to an internal server error.', details: errorMessage }, 500);
  }
});

export default app; 