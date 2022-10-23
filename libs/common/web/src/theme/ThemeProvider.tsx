import { useMemo } from 'react';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeOptions, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { useSettings } from '../hooks';
import { ThemeProviderProps } from './Theme.types';
import { breakpoints } from './breakpoints';
import { typography } from './typography';
import { palette } from './palette';
import { shadows } from './shadows';
import componentsOverride from './overrides';

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { themeMode } = useSettings();

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      typography,
      breakpoints,
      shape: { borderRadius: 8 },
      shadows: shadows[themeMode],
      palette: palette[themeMode],
    }),
    [themeMode],
  );

  const theme = createTheme(themeOptions);

  theme.components = componentsOverride(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
