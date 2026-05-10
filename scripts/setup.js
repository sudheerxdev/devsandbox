const fs = require('fs');
const path = require('path');

console.log('🚀 DevSandbox Setup Script\n');

const checks = [
  {
    name: 'Node.js',
    test: () => {
      try {
        require('child_process').execSync('node --version', {
          stdio: 'pipe',
        });
        return true;
      } catch {
        return false;
      }
    },
  },
  {
    name: 'npm',
    test: () => {
      try {
        require('child_process').execSync('npm --version', {
          stdio: 'pipe',
        });
        return true;
      } catch {
        return false;
      }
    },
  },
];

console.log('📋 Checking prerequisites...\n');

let allChecks = true;
checks.forEach((check) => {
  if (check.test()) {
    console.log(`✓ ${check.name} is installed`);
  } else {
    console.log(`✗ ${check.name} is NOT installed`);
    allChecks = false;
  }
});

if (!allChecks) {
  console.log(
    '\n❌ Please install missing prerequisites and try again.\n'
  );
  process.exit(1);
}

// Create .env file if not exists
const envPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', '.env.example');

console.log('\n📝 Checking environment configuration...\n');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    const exampleContent = fs.readFileSync(envExamplePath, 'utf-8');
    fs.writeFileSync(envPath, exampleContent);
    console.log('✓ Created .env file from template');
    console.log(
      '⚠️  Please update .env with your configuration before running services\n'
    );
  }
} else {
  console.log('✓ .env file already exists\n');
}

console.log('✅ Setup Complete!\n');
console.log('📚 Next steps:\n');
console.log('  1. Review and update .env configuration');
console.log('  2. Install dependencies: npm install');
console.log('  3. Start development: npm run dev');
console.log('  4. Or use Docker: npm run docker:up\n');
