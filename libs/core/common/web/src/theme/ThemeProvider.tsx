import { useMemo } from 'react';
import { CssBaseline } from '@mui/material';
import {
  createTheme,
  ThemeOptions,
  ThemeProvider as MUIThemeProvider,
  responsiveFontSizes,
} from '@mui/material/styles';

import { useSettings } from '../hooks';
import { ThemeProviderProps } from './Theme.types';
import { breakpoints } from './breakpoints';
import { typography } from './typography';
import { palette } from './palette';
import componentsOverride from './overrides';

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { themeMode } = useSettings();

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      typography,
      breakpoints,
      shape: { borderRadius: 8 },
      palette: palette[themeMode],
    }),
    [themeMode],
  );

  let theme = createTheme(themeOptions);

  theme.components = componentsOverride(theme);

  theme = responsiveFontSizes(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
