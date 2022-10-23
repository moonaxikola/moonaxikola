import { MoonaBaseProvider } from './MoonaBaseProvider';
import { MoonaNextProviderProps } from './MoonaProvider.types';

export function MoonaNextProvider({ settings, children }: MoonaNextProviderProps) {
  return <MoonaBaseProvider settings={settings}>{children}</MoonaBaseProvider>;
}
