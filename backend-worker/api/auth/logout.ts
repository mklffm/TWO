import { Hono } from 'hono';

const app = new Hono();

app.post('/', (c) => {
  // Instruct client to remove token (no cookies in Workers)
  return c.json({ message: 'Logged out successfully' });
});

export default app; 