/**
 * Cloudflare Pages Deployment Script for Mira Booking
 * 
 * This script provides a simplified way to deploy the Mira Booking app
 * to Cloudflare Pages using the CLI.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  projectName: 'mira-booking',
  outputDir: './out',
  branch: 'main', // For production deployments
  accountId: process.env.CF_ACCOUNT_ID || ''
};

function checkRequirements() {
  console.log('🔍 Checking deployment requirements...');
  
  // Check if user is logged in to Cloudflare
  try {
    const whoamiOutput = execSync('npx wrangler whoami').toString();
    if (!whoamiOutput.includes('You are logged in')) {
      console.error('❌ Not logged in to Cloudflare. Please run: npx wrangler login');
      process.exit(1);
    }
    
    // Extract account information
    const accountMatch = whoamiOutput.match(/Account ID\s+│\s+([a-f0-9]+)/);
    if (accountMatch && accountMatch[1]) {
      config.accountId = accountMatch[1];
      console.log(`✅ Found Cloudflare Account ID: ${config.accountId.substring(0, 4)}...${config.accountId.substring(config.accountId.length - 4)}`);
    }
    
    console.log('✅ Authenticated with Cloudflare');
  } catch (error) {
    console.error('❌ Failed to check Cloudflare authentication:', error.message);
    console.log('Please run: npx wrangler login');
    process.exit(1);
  }
  
  // Check if output directory exists
  if (!fs.existsSync(path.resolve(config.outputDir))) {
    console.error(`❌ Build output directory not found: ${config.outputDir}`);
    console.log('Please run: npm run build:cloudflare');
    process.exit(1);
  }
  console.log(`✅ Build output directory exists: ${config.outputDir}`);
  
  return true;
}

function buildProject() {
  console.log('🔨 Building project...');
  try {
    execSync('npm run build:cloudflare', { stdio: 'inherit' });
    console.log('✅ Build completed successfully');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

function deployToCloudflarePages() {
  console.log('🚀 Deploying to Cloudflare Pages...');
  
  const command = `npx wrangler pages deploy ${config.outputDir} --project-name=${config.projectName} --branch=${config.branch}`;
  
  try {
    execSync(command, { stdio: 'inherit' });
    console.log('✅ Deployment completed successfully');
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

// Main execution
async function main() {
  console.log('=== Mira Booking Deployment Tool ===');
  
  const args = process.argv.slice(2);
  const skipBuild = args.includes('--skip-build');
  
  // Check if we have everything we need
  checkRequirements();
  
  // Build unless specifically skipped
  if (!skipBuild) {
    buildProject();
  } else {
    console.log('🔄 Skipping build step');
  }
  
  // Deploy to Cloudflare Pages
  deployToCloudflarePages();
  
  console.log('\n🎉 Deployment process completed!');
  console.log(`Your site should be live at: https://${config.projectName}.pages.dev`);
  console.log('and at your custom domains if they are configured.');
}

// Run the main function
main().catch(error => {
  console.error('❌ Deployment failed with an error:', error);
  process.exit(1);
}); 