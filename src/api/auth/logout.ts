import { Hono } from 'hono';
import { Context } from 'hono';
import { setCookie } from 'hono/cookie';

const app = new Hono();

app.post('/', (c: Context) => {
  // Clear the auth cookie
  setCookie(c, 'auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    maxAge: 0, // Expire immediately
  });

  return c.json({ message: 'Logged out successfully' });
});

export default app; 