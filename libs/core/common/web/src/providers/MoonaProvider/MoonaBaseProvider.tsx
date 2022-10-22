import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { RequestProvider } from '@moona/core/common/data-access';

import { MoonaBaseProviderProps } from './MoonaProvider.types';
import { SettingsProvider } from '../../contexts';
import { ThemeProvider } from '../../theme';

export function MoonaBaseProvider({ settings, children, requestConfig }: MoonaBaseProviderProps) {
  return (
    <RequestProvider {...requestConfig}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale="pt-PT">
        <SettingsProvider defaultSettings={settings}>
          <ThemeProvider>{children}</ThemeProvider>
        </SettingsProvider>
      </LocalizationProvider>
    </RequestProvider>
  );
}
