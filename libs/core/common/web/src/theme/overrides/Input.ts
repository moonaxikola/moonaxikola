import { Theme } from '@mui/material/styles';

import { ThemeComponents } from '../Theme.types';

const filledColorMap = {
  light: {
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    hoverBackground: 'rgba(0, 0, 0, 0.09)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
  },
  dark: {
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    hoverBackground: 'rgba(255, 255, 255, 0.13)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
  },
} as const;

export default function Input(theme: Theme): Pick<ThemeComponents, 'MuiFilledInput' | 'MuiTextField'> {
  return {
    MuiTextField: {
      defaultProps: {
        variant: 'filled',
      },
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            '& svg': { color: theme.palette.text.disabled },
          },
        },
      },
    },
    MuiFilledInput: {
      defaultProps: {
        disableUnderline: true,
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: theme.shape.borderRadius,
          border: `2px solid ${filledColorMap[theme.palette.mode].backgroundColor}`,
          '&:hover': {
            borderColor: theme.palette[ownerState.color || 'primary']?.main,
          },
          '&:focus-within': {
            borderColor: theme.palette[ownerState.color || 'primary']?.main,
          },
        }),
      },
    },
  };
}
