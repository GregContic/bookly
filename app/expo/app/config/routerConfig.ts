// This file disables Expo Router development overlays
export const disableRouteDebugOverlay = () => {
  if (__DEV__) {
    // Disable route debug display
    if ((global as any).__EXPO_ROUTER_DEBUG_ENABLED !== undefined) {
      (global as any).__EXPO_ROUTER_DEBUG_ENABLED = false;
    }
  }
};
