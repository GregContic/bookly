# Development Build Setup Instructions

## Option 1: Create Development Build for Android

1. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   ```

2. Login to Expo:
   ```bash
   eas login
   ```

3. Configure EAS:
   ```bash
   eas build:configure
   ```

4. Build for Android (development):
   ```bash
   eas build --platform android --profile development
   ```

## Option 2: Use Local Development Build

1. Install expo-dev-client:
   ```bash
   npx expo install expo-dev-client
   ```

2. Create development build:
   ```bash
   npx expo run:android
   ```

## Option 3: Use Web Browser (Easiest)

1. Start web server:
   ```bash
   npx expo start --web
   ```

2. Open in browser: http://localhost:8081

## Option 4: Network Troubleshooting

1. Check IP address:
   ```bash
   ipconfig
   ```

2. Try tunnel mode:
   ```bash
   npx expo start --tunnel
   ```

3. Try localhost mode:
   ```bash
   npx expo start --localhost
   ```

## Common Issues and Solutions

- **Java IOException**: Clear cache with `npx expo start --clear`
- **Network issues**: Use tunnel mode or mobile hotspot
- **Firewall blocking**: Temporarily disable Windows Firewall
- **Expo Go crashes**: Update to latest version or use development build
