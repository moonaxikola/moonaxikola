import type { ReactNode } from 'react';
import type { ThemeMode } from '../../theme';

export interface SettingsValueProps {
  themeMode: ThemeMode;
}

export type SettingsContextProps = {
  themeMode: ThemeMode;
  onToggleMode: VoidFunction;
  onChangeMode: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onResetSetting: VoidFunction;
};

export type SettingsProviderProps = {
  children: ReactNode;
  defaultSettings: SettingsValueProps;
};
