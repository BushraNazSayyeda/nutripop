// Bootstrap script: installs deps then starts Vite
const { execSync, spawn } = require('child_process');
const path = require('path');

const root = __dirname;

try {
  console.log('📦 Installing dependencies...');
  execSync('npm install', { cwd: root, stdio: 'inherit' });
  console.log('✅ Dependencies installed. Starting Vite...');
} catch (e) {
  console.log('ℹ️  npm install skipped (already installed or error)');
}

const vite = spawn(
  'node',
  ['node_modules/.bin/vite', '--port', '5173', '--host'],
  { cwd: root, stdio: 'inherit', shell: true }
);

vite.on('error', (err) => { console.error('Vite error:', err); });
