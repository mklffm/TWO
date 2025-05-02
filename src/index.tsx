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

// Protected routes
app.use('/api/*', authMiddleware);

// Static files
app.use('/*', serveStatic({ root: './' }));

// Render React app
app.get('*', jsxRenderer(({ children }) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Mira Booking</title>
      <link href="/styles.css" rel="stylesheet" />
    </head>
    <body>
      <div id="root">{children}</div>
      <script src="/index.js"></script>
    </body>
  </html>
)));

export default app; 