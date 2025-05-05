/**
 * Helper script to deploy to a specific Cloudflare account
 * 
 * Usage:
 * node deploy-to-friend.js <CF_API_TOKEN> <CF_ACCOUNT_ID>
 */

const { execSync } = require('child_process');
const fs = require('fs');

// Get command line arguments (API token and Account ID)
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('❌ Error: Please provide both CF_API_TOKEN and CF_ACCOUNT_ID as arguments');
  console.log('Usage: node deploy-to-friend.js <CF_API_TOKEN> <CF_ACCOUNT_ID>');
  process.exit(1);
}

const apiToken = args[0];
const accountId = args[1];

// Mask the token and ID for logging
const maskedToken = apiToken.substring(0, 3) + '...' + apiToken.substring(apiToken.length - 3);
const maskedAccountId = accountId.substring(0, 3) + '...' + accountId.substring(accountId.length - 3);

console.log(`
🚀 Deploying to Cloudflare account: ${maskedAccountId}
🔑 Using API token: ${maskedToken}
`);

// Update wrangler.toml to fix inheritance warnings
console.log('Updating wrangler.toml configuration...');
const wranglerConfig = `
# Configuration for Cloudflare Workers
name = "mira-booking"
compatibility_date = "2023-12-01"
compatibility_flags = ["nodejs_compat"]
workers_dev = true
main = "./backend-worker/index.ts"
minify = true

# Routes configuration
routes = [
  { pattern = "*", zone_name = "mirabooking.com" }
]

# Domain configuration
[triggers]
crons = []

[site]
bucket = "./out"

# Environment variables
[vars]
ENVIRONMENT = "production"
DEPLOY_TIME = "real-time"
JWT_SECRET = ""

# Production environment configuration
[env.production]
name = "mira-booking"
workers_dev = false
routes = [
  { pattern = "*", zone_name = "mirabooking.com" },
  { pattern = "*", zone_name = "www.mirabooking.com" }
]
vars = { 
  ENVIRONMENT = "production",
  DEPLOY_TIME = "real-time",
  JWT_SECRET = ""
}

# D1 Database configuration
[[env.production.d1_databases]]
binding = "DB"
database_name = "mira-booking-db"
database_id = "0c1c1907-868c-4727-b348-90d2770c2c60"

# KV namespace for caching
[[env.production.kv_namespaces]]
binding = "CACHE"
id = "cache-namespace-id"
preview_id = "preview-cache-namespace-id"

# Setting up local development
[dev]
port = 8787
local_protocol = "http"
ip = "localhost"
`;

// Backup the original wrangler.toml
if (fs.existsSync('wrangler.toml')) {
  fs.copyFileSync('wrangler.toml', 'wrangler.toml.bak');
}

// Write the updated config
fs.writeFileSync('wrangler.toml', wranglerConfig);

// Run the build
console.log('\n📦 Building the application...');
try {
  execSync('npm run build:cloudflare', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Build failed:', error.message);
  // Restore the original config and exit
  if (fs.existsSync('wrangler.toml.bak')) {
    fs.copyFileSync('wrangler.toml.bak', 'wrangler.toml');
    fs.unlinkSync('wrangler.toml.bak');
  }
  process.exit(1);
}

// Deploy using temporary environment variables
console.log('\n🚀 Deploying to Cloudflare Workers...');
try {
  execSync('npx wrangler deploy --env production', {
    stdio: 'inherit',
    env: {
      ...process.env,
      CLOUDFLARE_API_TOKEN: apiToken,
      CF_ACCOUNT_ID: accountId
    }
  });
  console.log('\n✅ Deployment successful!');
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
} finally {
  // Restore the original config
  if (fs.existsSync('wrangler.toml.bak')) {
    fs.copyFileSync('wrangler.toml.bak', 'wrangler.toml');
    fs.unlinkSync('wrangler.toml.bak');
    console.log('\n🔄 Restored original wrangler.toml configuration');
  }
} 