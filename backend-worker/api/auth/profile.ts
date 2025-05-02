import { Hono } from 'hono';

const app = new Hono();

app.put('/', async (c) => {
  try {
    const user = c.get('user');
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    const db = c.env.DB;

    const { firstName, lastName, email } = await c.req.json();

    // Check if email is already taken by another user
    if (email !== user.email) {
      const existingUser = await db.prepare(
        'SELECT * FROM users WHERE email = ? AND id != ?'
      ).bind(email, user.id).first();

      if (existingUser) {
        return c.json({ error: 'Email already registered' }, 400);
      }
    }

    // Update user profile
    await db.prepare(
      'UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE id = ?'
    ).bind(firstName, lastName, email, user.id).run();

    return c.json({
      id: user.id,
      email,
      firstName,
      lastName
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app; 