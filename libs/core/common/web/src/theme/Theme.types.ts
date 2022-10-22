import type { ReactNode } from 'react';
import type { Components, Theme } from '@mui/material/styles';
// Theme augmentation, do not remove
import type {} from '@mui/lab/themeAugmentation';

export type ThemeMode = 'light' | 'dark';

export type ThemeProviderProps = {
  children: ReactNode;
};

export type ThemeComponents = Components<Omit<Theme, 'components'>>;

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
