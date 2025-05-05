/**
 * GitHub Actions Workflow Debug Helper
 * 
 * This script is designed to be run as part of the GitHub Actions workflow
 * to help diagnose environment and configuration issues.
 */

const fs = require('fs');
const path = require('path');

console.log(`
==================================================
GitHub Actions Workflow Diagnostic Tool
==================================================
`);

// Check environment variables
console.log('🔍 Checking environment variables:');
const criticalEnvVars = [
  'CLOUDFLARE_API_TOKEN',
  'CF_API_TOKEN',
  'CF_ACCOUNT_ID',
  'JWT_SECRET'
];

criticalEnvVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`✅ ${varName}: Set (value hidden)`);
  } else {
    console.log(`❌ ${varName}: Not set`);
  }
});

// Check file existence
console.log('\n🔍 Checking critical files:');
const criticalFiles = [
  'wrangler.toml',
  '.env',
  'package.json',
  'next.config.js'
];

criticalFiles.forEach(file => {
  try {
    fs.accessSync(file, fs.constants.F_OK);
    console.log(`✅ ${file}: Exists`);
    
    // Show file contents for some files
    if (file === '.env' || file === 'wrangler.toml') {
      const content = fs.readFileSync(file, 'utf8')
        .replace(/JWT_SECRET=.*/g, 'JWT_SECRET=****')
        .replace(/apiToken:.*/g, 'apiToken: ****');
      console.log(`\n📄 ${file} contents:`);
      console.log(content);
    }
  } catch (err) {
    console.log(`❌ ${file}: Missing`);
  }
});

// Check npm scripts
console.log('\n🔍 Checking package.json scripts:');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log('\n📄 Available scripts:');
  
  const criticalScripts = ['build', 'build:cloudflare', 'deploy'];
  
  Object.entries(packageJson.scripts || {}).forEach(([name, script]) => {
    if (criticalScripts.includes(name)) {
      console.log(`✅ ${name}: ${script}`);
    } else {
      console.log(`ℹ️ ${name}: ${script}`);
    }
  });
} catch (err) {
  console.log(`❌ Error reading package.json: ${err.message}`);
}

// Check directory structure
console.log('\n🔍 Checking directory structure:');
['src', 'out', 'backend-worker', 'public'].forEach(dir => {
  try {
    fs.accessSync(dir, fs.constants.F_OK);
    console.log(`✅ ${dir}/: Directory exists`);
  } catch (err) {
    console.log(`❌ ${dir}/: Directory missing`);
  }
});

console.log(`
==================================================
Diagnostic information complete
==================================================
`); 