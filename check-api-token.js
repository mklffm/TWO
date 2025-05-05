/**
 * Simple script to verify Cloudflare API token permissions
 * Usage: node check-api-token.js
 */

const { execSync } = require('child_process');

console.log('🔑 Checking Cloudflare API token permissions...');

// Check if token is set (try both environment variables)
const apiToken = process.env.CLOUDFLARE_API_TOKEN || process.env.CF_API_TOKEN;
if (!apiToken) {
  console.error('❌ Cloudflare API token environment variable is not set.');
  console.log('Please set your Cloudflare API token:');
  console.log('  $env:CLOUDFLARE_API_TOKEN="your_token_here"    # Windows PowerShell (Recommended)');
  console.log('  $env:CF_API_TOKEN="your_token_here"            # Windows PowerShell (Legacy)');
  console.log('  set CLOUDFLARE_API_TOKEN=your_token_here       # Windows CMD');
  console.log('  export CLOUDFLARE_API_TOKEN=your_token_here    # Linux/Mac');
  process.exit(1);
}

console.log('✅ API token is set in environment variables.');

try {
  // Run wrangler whoami to check permissions
  console.log('\n🔍 Checking wrangler authentication...');
  const whoamiResult = execSync('npx wrangler whoami', { 
    env: { ...process.env, CLOUDFLARE_API_TOKEN: apiToken },
    encoding: 'utf8'
  });
  
  console.log('✅ Successfully authenticated with Cloudflare!');
  console.log('\n📋 Account information:');
  console.log(whoamiResult);
  
  // Extract account ID from the output
  const accountIdMatch = whoamiResult.match(/Account ID: ([a-f0-9]+)/i);
  if (accountIdMatch && accountIdMatch[1]) {
    const accountId = accountIdMatch[1];
    console.log(`\n🔑 Your Cloudflare Account ID: ${accountId}`);
    console.log('Set this value as CF_ACCOUNT_ID environment variable:');
    console.log('  $env:CF_ACCOUNT_ID="' + accountId + '"    # Windows PowerShell');
    console.log('  set CF_ACCOUNT_ID=' + accountId + '       # Windows CMD');
    console.log('  export CF_ACCOUNT_ID=' + accountId + '    # Linux/Mac');
  }
  
  // Check Workers permissions
  console.log('\n🔍 Testing Workers permissions...');
  
  try {
    // Try to list Workers to verify permissions
    const listResult = execSync('npx wrangler workers list', { 
      env: { ...process.env, CLOUDFLARE_API_TOKEN: apiToken },
      encoding: 'utf8'
    });
    
    console.log('✅ Successfully verified Workers permissions!');
    console.log('\n📋 Your Workers:');
    console.log(listResult);
    
    console.log('\n🎉 Your API token has all necessary permissions for deployment!');
  } catch (error) {
    console.error('❌ Error accessing Workers list. Your token may not have the right permissions:');
    console.error(error.message);
    console.log('\n🔧 Please ensure your token has "Edit Cloudflare Workers" permissions.');
  }
  
} catch (error) {
  console.error('❌ Authentication failed. Please check your API token:');
  console.error(error.message);
  process.exit(1);
} 