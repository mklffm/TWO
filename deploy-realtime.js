/**
 * Real-time deployment script for Cloudflare Workers
 * 
 * This script deploys changes to Cloudflare Workers with 1-second polling
 * to detect and deploy changes immediately.
 * 
 * Usage: node deploy-realtime.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const https = require('https');

// Configuration (replace with your actual values)
const config = {
  // Your Cloudflare API token with Workers permission
  apiToken: process.env.CLOUDFLARE_API_TOKEN || process.env.CF_API_TOKEN,
  
  // Your Cloudflare account ID
  accountId: process.env.CF_ACCOUNT_ID,
  
  // Worker name
  workerName: 'mira-booking',
  
  // Directories to watch
  watchDirs: ['src', 'backend-worker', 'public'],
  
  // Polling interval in milliseconds (1 second)
  pollInterval: 1000,
  
  // Build command to run before deploying
  buildCommand: 'npm run build:cloudflare'
};

// Validate required environment variables
if (!config.apiToken) {
  console.error('❌ Error: Cloudflare API token environment variable is not set.');
  console.log('Please set your Cloudflare API token:');
  console.log('  $env:CLOUDFLARE_API_TOKEN="your_token_here"    # Windows PowerShell (Recommended)');
  console.log('  $env:CF_API_TOKEN="your_token_here"            # Windows PowerShell (Legacy)');
  process.exit(1);
}

if (!config.accountId) {
  console.error('❌ Error: CF_ACCOUNT_ID environment variable is not set.');
  console.log('Please set your Cloudflare account ID:');
  console.log('  $env:CF_ACCOUNT_ID="your_account_id"');
  process.exit(1);
}

// File modification times cache
const lastModified = new Map();

// Initialize file modification cache
function initializeFileCache() {
  console.log('📋 Initializing file modification cache...');
  
  config.watchDirs.forEach(dir => {
    const dirPath = path.resolve(process.cwd(), dir);
    walkDir(dirPath, file => {
      lastModified.set(file, fs.statSync(file).mtimeMs);
    });
  });
  
  console.log(`✅ Monitoring ${lastModified.size} files for changes`);
}

// Recursively walk through directory
function walkDir(dir, callback) {
  try {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      
      // Skip node_modules and .git
      if (file === 'node_modules' || file === '.git' || file === '.next' || file === 'out') {
        return;
      }
      
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath, callback);
      } else {
        callback(filePath);
      }
    });
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err);
  }
}

// Check for file changes
function checkForChanges() {
  let hasChanges = false;
  
  config.watchDirs.forEach(dir => {
    const dirPath = path.resolve(process.cwd(), dir);
    
    walkDir(dirPath, file => {
      try {
        const currentMtime = fs.statSync(file).mtimeMs;
        const previousMtime = lastModified.get(file);
        
        if (!previousMtime || currentMtime > previousMtime) {
          console.log(`🔄 File changed: ${file}`);
          lastModified.set(file, currentMtime);
          hasChanges = true;
        }
      } catch (err) {
        // File might have been deleted
        if (lastModified.has(file)) {
          console.log(`🗑️ File deleted: ${file}`);
          lastModified.delete(file);
          hasChanges = true;
        }
      }
    });
  });
  
  // Also check for new files
  config.watchDirs.forEach(dir => {
    const dirPath = path.resolve(process.cwd(), dir);
    
    walkDir(dirPath, file => {
      if (!lastModified.has(file)) {
        console.log(`📄 New file: ${file}`);
        lastModified.set(file, fs.statSync(file).mtimeMs);
        hasChanges = true;
      }
    });
  });
  
  return hasChanges;
}

// Deploy to Cloudflare Workers
async function deploy() {
  console.log('🚀 Deploying to Cloudflare Workers...');
  
  try {
    // Run build command
    console.log(`Running: ${config.buildCommand}`);
    execSync(config.buildCommand, { stdio: 'inherit' });
    
    // Deploy using wrangler
    console.log('Deploying with wrangler...');
    
    // Build the command with explicit env vars to ensure they're passed
    const deployCmd = `npx wrangler deploy --name=${config.workerName} --env=production`;
    console.log(`Running: ${deployCmd}`);
    
    // Execute with environment variables
    execSync(deployCmd, { 
      stdio: 'inherit',
      env: {
        ...process.env,
        CLOUDFLARE_API_TOKEN: config.apiToken,
        CF_ACCOUNT_ID: config.accountId
      }
    });
    
    console.log('✅ Deployment successful!');
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
  }
}

// Main function
async function main() {
  console.log('🔄 Starting real-time deployment monitor...');
  console.log(`📡 Polling every ${config.pollInterval}ms for changes`);
  
  // Initialize file cache
  initializeFileCache();
  
  // Initial deployment
  await deploy();
  
  // Monitor for changes
  setInterval(async () => {
    if (checkForChanges()) {
      await deploy();
    }
  }, config.pollInterval);
}

// Start the script
main().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
}); 