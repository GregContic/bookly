import { SolitoAppProvider } from '@shared';
import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'solito/router';

export default function App() {
  return (
    <SolitoAppProvider>
      <ExpoRoot />
    </SolitoAppProvider>
  );
}

registerRootComponent(App);
