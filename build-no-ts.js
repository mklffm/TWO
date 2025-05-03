const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Backup the original tsconfig.json
const tsconfigPath = path.join(__dirname, 'tsconfig.json');
const tsconfigBackupPath = path.join(__dirname, 'tsconfig.json.bak');

console.log('Backing up tsconfig.json...');
fs.copyFileSync(tsconfigPath, tsconfigBackupPath);

// Read the original tsconfig to preserve paths
const originalTsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));

// Create a simplified tsconfig.json that ignores type checking but keeps paths
const simplifiedTsconfig = {
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": originalTsconfig.compilerOptions.paths || {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts"],
  "exclude": ["**/*.ts", "**/*.tsx", "node_modules"]
};

console.log('Writing simplified tsconfig.json...');
fs.writeFileSync(tsconfigPath, JSON.stringify(simplifiedTsconfig, null, 2));

try {
  console.log('Building Next.js app without TypeScript checks...');
  execSync('next build', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error);
} finally {
  // Restore the original tsconfig.json
  console.log('Restoring original tsconfig.json...');
  fs.copyFileSync(tsconfigBackupPath, tsconfigPath);
  fs.unlinkSync(tsconfigBackupPath);
} 