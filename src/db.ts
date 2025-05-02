import { D1Database } from '@cloudflare/workers-types';

declare global {
  const DB: D1Database;
}
 
export const db = DB; 