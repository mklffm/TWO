import { Hono } from 'hono';
import { Context, Next } from 'hono';
import loginRouter from './api/auth/login';
import registerRouter from './api/auth/register';
import logoutRouter from './api/auth/logout';
import profileRouter from './api/auth/profile';
import passwordRouter from './api/auth/password';
import { authMiddleware } from './middleware/auth';

// Type for environment variables
interface Bindings {
  DB: any;
  JWT_SECRET: string;
  [key: string]: any;
}

// Create Hono app with proper typing
const app = new Hono<{ Bindings: Bindings }>();

// Add a root path handler to confirm the server is working
app.get('/', (c) => {
  return c.json({
    status: 'ok',
    message: 'Mira Booking API Server is running',
    version: '1.0.0',
    endpoints: {
      auth: ['/api/auth/login', '/api/auth/register', '/api/auth/logout', '/api/auth/profile', '/api/auth/password']
    }
  });
});

// Global middleware for CORS
app.use('*', async (c: Context, next: Next) => {
  // Get the origin from the request
  const origin = c.req.header('Origin') || '*';
  
  // Allow specific origins or all in development
  c.header('Access-Control-Allow-Origin', origin);
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
  c.header('Access-Control-Allow-Credentials', 'true');
  c.header('Access-Control-Max-Age', '86400'); // 24 hours
  
  // Handle OPTIONS request
  if (c.req.method === 'OPTIONS') {
    return c.text('', 204);
  }
  
  // Continue to the next middleware/handler
  await next();
});

// Auth routes that don't need authentication
app.route('/api/auth/login', loginRouter);
app.route('/api/auth/register', registerRouter);
app.route('/api/auth/logout', logoutRouter);
app.route('/api/auth/profile', profileRouter);
app.route('/api/auth/password', passwordRouter);

// Apply auth middleware to protected routes
app.use('/api/*', authMiddleware as any);

export default app; 