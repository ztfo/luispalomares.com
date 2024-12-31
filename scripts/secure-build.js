const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Import password from local config
const { EDITOR_PASSWORD } = require('../src/config/local.js');

async function secureBuild() {
  try {
    // Regular build
    execSync('vue-cli-service build', { stdio: 'inherit' });

    // Install staticrypt and terser if not already installed
    execSync('npm install -g staticrypt terser', { stdio: 'inherit' });

    // Encrypt the gate file
    execSync(`staticrypt dist/editor-gate.html "${EDITOR_PASSWORD}" --template-no-css --template-no-script`, { stdio: 'inherit' });

    // Obfuscate the encrypted file
    execSync('terser dist/editor-gate.html --compress --mangle -o dist/editor-gate.html', { stdio: 'inherit' });

    // Add CNAME
    fs.writeFileSync('dist/CNAME', 'luispalomares.com');

    console.log('Build secured successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

secureBuild(); 