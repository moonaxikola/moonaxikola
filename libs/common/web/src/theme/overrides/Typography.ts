import { Theme } from '@mui/material/styles';

import { ThemeComponents } from '../Theme.types';

export default function Typography(theme: Theme): Pick<ThemeComponents, 'MuiTypography'> {
  return {
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
      },
    },
  };
}
