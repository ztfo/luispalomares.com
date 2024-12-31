const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Import password from local config
const { EDITOR_PASSWORD } = require('../src/config/local.js');

async function secureBuild() {
  try {
    // Regular build
    execSync('vue-cli-service build', { stdio: 'inherit' });

    // Copy editor-gate.html to dist
    fs.copyFileSync('public/editor-gate.html', 'dist/editor-gate.html');

    // Replace password placeholder
    let gateContent = fs.readFileSync('dist/editor-gate.html', 'utf8');
    gateContent = gateContent.replace('your-secure-password-here', EDITOR_PASSWORD);
    fs.writeFileSync('dist/editor-gate.html', gateContent);

    // Add CNAME
    fs.writeFileSync('dist/CNAME', 'luispalomares.com');

    console.log('Build secured successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

secureBuild(); 