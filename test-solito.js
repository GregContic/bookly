#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');

console.log('🔧 Testing Solito setup...\n');

const testPaths = [
  'shared/navigation/useNavigation.ts',
  'shared/providers/SolitoProvider.tsx',
  'app/expo/babel.config.js',
  'app/next/next.config.ts',
];

console.log('✅ Checking file structure:');
testPaths.forEach(testPath => {
  const fullPath = path.join(process.cwd(), testPath);
  try {
    require('fs').accessSync(fullPath);
    console.log(`  ✓ ${testPath}`);
  } catch {
    console.log(`  ✗ ${testPath} - Missing!`);
  }
});

console.log('\n✅ Checking TypeScript compilation:');
try {
  execSync('npx tsc --noEmit --project shared', { stdio: 'pipe' });
  console.log('  ✓ Shared package compiles without errors');
} catch (error) {
  console.log('  ✗ Shared package has compilation errors');
  console.log('  ', error.stdout?.toString() || error.message);
}

console.log('\n✅ Checking dependencies:');
const packageJson = require('./package.json');
const hasSolito = packageJson.dependencies?.solito || packageJson.devDependencies?.solito;
console.log(`  ${hasSolito ? '✓' : '✗'} Solito: ${hasSolito || 'Not found'}`);

console.log('\n🚀 Solito setup test complete!');
console.log('Next steps:');
console.log('  1. Run "npm run start" for Expo');
console.log('  2. Run "npm run dev" for Next.js');
console.log('  3. Start using useCrossPlatformNavigation() in your components');
