import { MoonaBaseProvider } from './MoonaBaseProvider';
import { MoonaNextProviderProps } from './MoonaProvider.types';

export function MoonaNextProvider({ settings, requestConfig, children }: MoonaNextProviderProps) {
  return (
    <MoonaBaseProvider settings={settings} requestConfig={requestConfig}>
      {children}
    </MoonaBaseProvider>
  );
}
