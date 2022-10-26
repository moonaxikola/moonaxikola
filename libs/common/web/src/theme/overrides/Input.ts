import { Theme } from '@mui/material/styles';

import { ThemeComponents } from '../Theme.types';

export default function Input(theme: Theme): Pick<ThemeComponents, 'MuiFilledInput' | 'MuiTextField'> {
  return {
    MuiTextField: {
      defaultProps: {
        variant: 'filled',
      },
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            '& svg': {
              color: theme.palette.text.disabled,
            },
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
          border: '2px solid transparent',
          '&:hover': {
            borderColor: theme.palette[ownerState.color || 'primary']?.main,
          },
          '&:focus-within': {
            borderColor: theme.palette[ownerState.color || 'primary']?.main,
          },
        }),
        error: {
          borderColor: theme.palette.error.main,
        },
      },
    },
  };
}
