import blue from '@mui/material/colors/blue';
import red from '@mui/material/colors/red';
import { Theme } from '@mui/material/styles';

import { ThemeComponents } from '../Theme.types';

export default function Button(theme: Theme): Pick<ThemeComponents, 'MuiButton' | 'MuiLoadingButton'> {
  return {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      variants: [
        {
          props: {
            variant: 'dashed',
          },
          style: {
            border: `2px dashed ${blue[500]}`,
          },
        },
        {
          props: {
            variant: 'dashed',
            color: 'secondary',
          },
          style: {
            border: `4px dashed ${red[500]}`,
          },
        },
      ],
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeLarge: {
          height: 48,
        },
      },
    },
    MuiLoadingButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
  };
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}
