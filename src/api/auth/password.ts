import { Hono } from 'hono';
import { Context } from 'hono';
import bcrypt from 'bcrypt';
import { db } from '../../db';

const app = new Hono();

app.put('/', async (c: Context) => {
  try {
    const user = c.get('user');
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { currentPassword, newPassword } = await c.req.json();

    // Get user from database to verify current password
    const dbUser = await db.prepare(
      'SELECT * FROM users WHERE id = ?'
    ).bind(user.id).first();

    if (!dbUser) {
      return c.json({ error: 'User not found' }, 404);
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, dbUser.password as string);
    if (!isValidPassword) {
      return c.json({ error: 'Current password is incorrect' }, 400);
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await db.prepare(
      'UPDATE users SET password = ? WHERE id = ?'
    ).bind(hashedPassword, user.id).run();

    return c.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password update error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app; 