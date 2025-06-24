# Solito Setup Guide for BooklyPH

## ✅ What Has Been Configured

### 1. Project Structure
- **Monorepo**: Root project with workspaces: `app/expo`, `app/next`, and `shared`
- **Shared Package**: Contains cross-platform navigation, components, and business logic
- **Platform-specific Apps**: Expo and Next.js apps configured to use Solito

### 2. Dependencies Installed
- `solito@4.4.1` in root, Expo, and Next.js packages
- `react-native-web` for Next.js cross-platform compatibility
- `babel-plugin-module-resolver` for proper module resolution

### 3. Configuration Files Created/Updated

#### TypeScript Configurations
- **Root tsconfig.json**: Updated with shared package paths
- **Expo tsconfig.json**: Added `@shared/*` alias
- **Next.js tsconfig.json**: Added `@shared/*` alias
- **Shared tsconfig.json**: Standalone TypeScript config

#### Build Configurations
- **Expo babel.config.js**: Added module resolver with shared package aliases
- **Next.js next.config.ts**: Added transpilation and React Native Web support
- **Package.json scripts**: Added convenient development commands

### 4. Shared Navigation System
- **useCrossPlatformNavigation()**: Hook that works across platforms
- **Route constants**: Centralized route definitions
- **Helper functions**: `navigateToRoute()`, `navigateToBusinessBooking()`

## 🚀 How to Use Solito

### 1. Start Development Servers

```bash
# Start Expo development server
npm run expo-dev
# or
cd app/expo && expo start

# Start Next.js development server
npm run next-dev  
# or
cd app/next && npm run dev
```

### 2. Update Existing Components

Replace existing navigation with Solito navigation:

```typescript
// Before (platform-specific)
import { useRouter } from 'expo-router';
// or
import { useRouter } from 'next/navigation';

// After (cross-platform)
import { useCrossPlatformNavigation } from '@shared/navigation/useNavigation';

function MyComponent() {
  const navigation = useCrossPlatformNavigation();
  
  const handlePress = () => {
    navigation.push('/(services)/health-wellness');
    // or with parameters
    navigation.push({
      pathname: '/(booking)/details',
      params: { businessId: 'business-123' }
    });
  };
  
  return <button onClick={handlePress}>Navigate</button>;
}
```

### 3. Use Shared Components

```typescript
// Import shared components
import { ServiceCard } from '@shared/components/ServiceCard';
import { useCrossPlatformNavigation } from '@shared/navigation/useNavigation';

function ServicesList() {
  const navigation = useCrossPlatformNavigation();
  
  return (
    <ServiceCard
      service={service}
      onPress={() => navigation.push('/booking')}
    />
  );
}
```

### 4. Shared Business Logic

```typescript
// Use shared hooks and logic
import { useServiceScreens } from '@shared/screens/useServiceScreens';

function HealthWellnessScreen() {
  const { services, loading, error } = useServiceScreens('health-wellness');
  
  // Component logic here
}
```

## 📁 Updated File Structure

```
bookly-ph-native/
├── shared/                     # 🆕 Shared cross-platform code
│   ├── navigation/
│   │   ├── useNavigation.ts    # 🆕 Cross-platform navigation
│   │   └── SolitoNavigation.tsx # 🆕 Navigation provider
│   ├── providers/
│   │   └── SolitoProvider.tsx  # 🆕 App provider
│   ├── components/
│   │   └── ServiceCard.tsx     # 🆕 Shared component
│   ├── screens/
│   │   └── useServiceScreens.ts # 🆕 Shared business logic
│   ├── types/
│   │   └── index.ts            # 🆕 Shared types
│   ├── hooks/
│   │   └── usePlatform.ts      # 🆕 Platform detection
│   ├── package.json            # 🆕 Shared package config
│   ├── tsconfig.json           # 🆕 TypeScript config
│   └── index.ts                # 🆕 Shared exports
├── app/
│   ├── expo/
│   │   ├── babel.config.js     # 🔄 Updated with module resolver
│   │   ├── tsconfig.json       # 🔄 Added shared paths
│   │   ├── package.json        # 🔄 Added Solito dependency
│   │   └── App.tsx             # 🔄 Updated to use Solito
│   └── next/
│       ├── next.config.ts      # 🔄 Added RN Web support
│       ├── tsconfig.json       # 🔄 Added shared paths
│       ├── package.json        # 🔄 Added Solito + RN Web
│       ├── pages/_app.tsx      # 🆕 App wrapper with Solito
│       └── styles/globals.css  # 🆕 Global styles
├── examples/
│   └── SolitoUsageExample.tsx  # 🆕 Usage examples
├── package.json                # 🔄 Updated scripts and dependencies
├── tsconfig.json               # 🔄 Added shared paths
└── test-solito.js              # 🆕 Setup verification script
```

## 🔧 Next Steps

### 1. Migrate Existing Components
- Update `app/expo/app/_components/ServiceCard.tsx` to use `useCrossPlatformNavigation()`
- Replace router usage in home page and service pages
- Update booking flow navigation

### 2. Test Cross-Platform Navigation
```bash
# Test the setup
npm run test-solito

# Start both platforms and test navigation
npm run expo-dev    # Terminal 1
npm run next-dev    # Terminal 2
```

### 3. Create Shared Screens
- Move common business logic to `shared/screens/`
- Create shared components in `shared/components/`
- Share types and interfaces across platforms

### 4. Optional Improvements
- Add path aliases to simplify imports: `@shared/navigation/useNavigation`
- Create shared styling system
- Add shared state management (Redux, Zustand, etc.)
- Add shared API layer

## 🎯 Key Benefits Achieved

1. **Single Codebase**: Share navigation logic between Expo and Next.js
2. **Type Safety**: TypeScript support across all platforms
3. **Better DX**: Simplified development with unified navigation APIs
4. **Maintainability**: Centralized navigation and business logic
5. **Performance**: Optimized builds for both mobile and web

## 📚 Useful Commands

```bash
# Development
npm run expo-dev        # Start Expo development
npm run next-dev        # Start Next.js development
npm run test-solito     # Verify Solito setup

# Building
npm run build           # Build Next.js
expo build              # Build Expo app

# Utilities
npm install             # Install all workspace dependencies
npm run lint            # Lint all packages
```

Your project is now ready to use Solito for cross-platform navigation! 🎉
