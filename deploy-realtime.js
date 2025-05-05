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
  apiToken: process.env.CF_API_TOKEN || 'your-api-token-here',
  
  // Your Cloudflare account ID
  accountId: process.env.CF_ACCOUNT_ID || 'your-account-id-here',
  
  // Worker name
  workerName: 'mira-booking',
  
  // Directories to watch
  watchDirs: ['src', 'backend-worker'],
  
  // Polling interval in milliseconds (1 second)
  pollInterval: 1000,
  
  // Build command to run before deploying
  buildCommand: 'npm run build:cloudflare'
};

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
    execSync('npx wrangler deploy', { stdio: 'inherit' });
    
    // Or alternatively use the Cloudflare API directly
    // await deployWithCloudflareAPI();
    
    console.log('✅ Deployment successful!');
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
  }
}

// Deploy using Cloudflare API directly
async function deployWithCloudflareAPI() {
  return new Promise((resolve, reject) => {
    // Get worker script
    const scriptPath = path.resolve(process.cwd(), './dist/worker.js');
    const script = fs.readFileSync(scriptPath, 'utf8');
    
    // Prepare request data
    const data = JSON.stringify({
      metadata: {
        body_part: 'script',
      },
      script: script,
      // Add any additional configuration here
    });
    
    // API request options
    const options = {
      hostname: 'api.cloudflare.com',
      port: 443,
      path: `/client/v4/accounts/${config.accountId}/workers/scripts/${config.workerName}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'Authorization': `Bearer ${config.apiToken}`,
      },
    };
    
    // Make HTTP request
    const req = https.request(options, (res) => {
      let responseBody = '';
      
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(responseBody);
          
          if (response.success) {
            console.log('API deployment successful:', response.result);
            resolve(response);
          } else {
            console.error('API deployment failed:', response.errors);
            reject(new Error(JSON.stringify(response.errors)));
          }
        } catch (error) {
          reject(error);
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.write(data);
    req.end();
  });
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