import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Support for Solito and React Native Web
  transpilePackages: [
    'react-native-web',
    'solito',
    '@shared',
    'react-native',
    'expo-router',
    'expo-linking',
    'expo-constants',
    'expo-modules-core',
  ],
  
  webpack: (config, { isServer }) => {
    // Resolve react-native to react-native-web on web
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
    };

    // Exclude react-native from being processed by webpack in server-side rendering
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push('react-native');
    }

    return config;
  },
  
  // Experimental features for better Next.js integration
  experimental: {
    esmExternals: 'loose',
  },
};

export default nextConfig;
