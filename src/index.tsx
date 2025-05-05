import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';
import { jsxRenderer } from 'hono/jsx-renderer';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { cors } from 'hono/cors';
import { authMiddleware } from './middleware/auth';
import loginRouter from './api/auth/login';
import registerRouter from './api/auth/register';
import logoutRouter from './api/auth/logout';
import profileRouter from './api/auth/profile';
import passwordRouter from './api/auth/password';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', prettyJSON());
app.use('*', cors());

// Auth routes
app.route('/api/auth/login', loginRouter);
app.route('/api/auth/register', registerRouter);
app.route('/api/auth/logout', logoutRouter);
app.route('/api/auth/profile', profileRouter);
app.route('/api/auth/password', passwordRouter);

// Protected routes - now using the middleware function directly
app.use('/api/*', authMiddleware);

// Static files 
// Use empty manifest object to satisfy type requirements
app.use('/*', serveStatic({ root: './', manifest: {} }));

// Simple fallback route instead of the JSX renderer for now
app.get('*', (c) => c.text('Mira Booking API Server'));

export default app; 