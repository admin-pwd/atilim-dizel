import { execSync } from 'child_process';

try {
  console.log('Installing dependencies with pnpm...');
  execSync('cd /vercel/share/v0-project && pnpm install', { stdio: 'inherit' });
  console.log('Dependencies installed successfully!');
} catch (error) {
  console.error('Install failed:', error.message);
}
