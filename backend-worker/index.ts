import { Hono } from 'hono';
import loginRouter from './api/auth/login';
import registerRouter from './api/auth/register';
import logoutRouter from './api/auth/logout';
import profileRouter from './api/auth/profile';
import passwordRouter from './api/auth/password';
import { authMiddleware } from './middleware/auth';

const app = new Hono();

// Global middleware for CORS
app.all('*', (c) => {
  // Add CORS headers
  c.header('Access-Control-Allow-Origin', '*');
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle OPTIONS request
  if (c.req.method === 'OPTIONS') {
    return c.text('', 204);
  }
  
  return c.next();
});

app.route('/api/auth/login', loginRouter);
app.route('/api/auth/register', registerRouter);
app.route('/api/auth/logout', logoutRouter);
app.route('/api/auth/profile', profileRouter);
app.route('/api/auth/password', passwordRouter);

app.use('/api/*', authMiddleware);

export default app; 