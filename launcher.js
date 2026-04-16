/**
 * NutriPop All-in-One Launcher
 * Run with:  node launcher.js
 * Works from any terminal (cmd, PowerShell, Git Bash)
 */
const { execSync, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT    = __dirname;
const CLIENT  = path.join(ROOT, 'client');
const SERVER  = path.join(ROOT, 'server');

function log(msg)  { console.log('\x1b[36m[NutriPop]\x1b[0m ' + msg); }
function ok(msg)   { console.log('\x1b[32m[NutriPop]\x1b[0m ' + msg); }
function err(msg)  { console.error('\x1b[31m[NutriPop]\x1b[0m ' + msg); }

function needsInstall(dir) {
  return !fs.existsSync(path.join(dir, 'node_modules'));
}

function install(dir, label) {
  if (needsInstall(dir)) {
    log(`Installing ${label} dependencies...`);
    try {
      execSync('npm install', { cwd: dir, stdio: 'inherit' });
      ok(`${label} dependencies installed!`);
    } catch(e) {
      err(`Failed to install ${label} deps. Make sure Node.js is installed.`);
      process.exit(1);
    }
  } else {
    ok(`${label} dependencies already installed.`);
  }
}

// Install both
install(SERVER, 'backend');
install(CLIENT, 'frontend');

console.log('');
log('Starting NutriPop backend on http://localhost:5000 ...');
const backend = spawn('node', ['index.js'], {
  cwd: SERVER,
  stdio: ['ignore', 'pipe', 'pipe'],
  shell: false,
});
backend.stdout.on('data', d => process.stdout.write('\x1b[33m[Backend]\x1b[0m ' + d));
backend.stderr.on('data', d => process.stderr.write('\x1b[31m[Backend]\x1b[0m ' + d));
backend.on('error', e => err('Backend error: ' + e.message));

// Wait a moment then start frontend
setTimeout(() => {
  log('Starting NutriPop frontend on http://localhost:5173 ...');

  // Find vite binary
  const viteBin = path.join(CLIENT, 'node_modules', '.bin', 'vite');
  const viteCmd = process.platform === 'win32' ? viteBin + '.cmd' : viteBin;

  const frontend = spawn(viteCmd, ['--port', '5173', '--host', '0.0.0.0'], {
    cwd: CLIENT,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: process.platform === 'win32',
  });
  frontend.stdout.on('data', d => {
    const text = d.toString();
    process.stdout.write('\x1b[35m[Frontend]\x1b[0m ' + text);
    if (text.includes('localhost')) {
      console.log('');
      ok('========================================');
      ok('  NutriPop is LIVE!');
      ok('  Open: http://localhost:5173');
      ok('========================================');
      console.log('');
    }
  });
  frontend.stderr.on('data', d => process.stderr.write('\x1b[31m[Frontend]\x1b[0m ' + d));
  frontend.on('error', e => err('Frontend error: ' + e.message));
}, 1500);

// Graceful shutdown
process.on('SIGINT', () => {
  log('Shutting down...');
  backend.kill();
  process.exit(0);
});
