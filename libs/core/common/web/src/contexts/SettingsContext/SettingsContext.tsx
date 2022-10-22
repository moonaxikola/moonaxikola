import { createContext } from 'react';
import { noop } from '@moona/core/common/utils';

import { SettingsProviderProps, SettingsContextProps, SettingsValueProps } from './SettingsContext.types';
import { useSettingCookies } from './useSettingCookies';
import { ThemeMode } from '../../theme';

export const defaultSettings: SettingsValueProps = {
  themeMode: 'light',
};

const initialState: SettingsContextProps = {
  ...defaultSettings,
  onToggleMode: noop,
  onChangeMode: noop,
  onResetSetting: noop,
};

export const SettingsContext = createContext(initialState);

export function SettingsProvider({ children, defaultSettings }: SettingsProviderProps) {
  const [settings, setSettings] = useSettingCookies(defaultSettings);

  const onToggleMode = () => {
    setSettings({ ...settings, themeMode: settings.themeMode === 'light' ? 'dark' : 'light' });
  };

  const onChangeMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, themeMode: event.target.value as ThemeMode });
  };

  const onResetSetting = () => {
    setSettings({ themeMode: initialState.themeMode });
  };

  return (
    <SettingsContext.Provider value={{ ...settings, onChangeMode, onToggleMode, onResetSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}
