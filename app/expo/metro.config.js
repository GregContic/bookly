const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Find the project directory
const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

// 1. Only watch the expo directory to avoid conflicts with Next.js
config.watchFolders = [projectRoot];

// 2. Set the app root to enable proper expo-router functionality
process.env.EXPO_ROUTER_APP_ROOT = path.resolve(projectRoot, 'app');

// 3. Exclude build directories and other files that shouldn't be watched
config.resolver.blockList = [
  /\.next\/.*/,
  /dist\/.*/,
  /build\/.*/,
];

module.exports = config;
