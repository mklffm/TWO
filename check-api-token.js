/**
 * Utility script to check if Cloudflare API token is configured
 * Used to verify environment setup before deployment
 */

const fs = require('fs');
const { execSync } = require('child_process');

// Check environment variables
const apiToken = process.env.CLOUDFLARE_API_TOKEN || process.env.CF_API_TOKEN;
const accountId = process.env.CF_ACCOUNT_ID;

console.log(`
========================================
Cloudflare API Token Verification
========================================
`);

if (!apiToken) {
  console.error('❌ Error: Cloudflare API token is not set.');
  console.log('Please set your Cloudflare API token:');
  console.log('  $env:CLOUDFLARE_API_TOKEN="your_token_here"    # Windows PowerShell');
  console.log('  $env:CF_API_TOKEN="your_token_here"            # Alternative');
  process.exit(1);
}

if (!accountId) {
  console.error('❌ Error: CF_ACCOUNT_ID environment variable is not set.');
  console.log('Please set your Cloudflare account ID:');
  console.log('  $env:CF_ACCOUNT_ID="your_account_id"');
  process.exit(1);
}

console.log('✅ Cloudflare API token is configured');
console.log('✅ Cloudflare Account ID is configured');

// Check if wrangler.toml exists
try {
  fs.accessSync('./wrangler.toml', fs.constants.F_OK);
  console.log('✅ wrangler.toml file exists');
} catch (err) {
  console.error('❌ Error: wrangler.toml file is missing');
  process.exit(1);
}

// Verify wrangler installation
try {
  const wranglerVersion = execSync('npx wrangler --version').toString().trim();
  console.log(`✅ Wrangler is installed (${wranglerVersion})`);
} catch (err) {
  console.error('❌ Error: Could not verify wrangler installation');
  console.error(err);
  process.exit(1);
}

// Success message
console.log(`
========================================
✅ All checks passed! Ready for deployment
========================================
`); 