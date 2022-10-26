import { Theme } from '@mui/material/styles';

import { ThemeComponents } from '../Theme.types';

export default function CssBaseline(theme: Theme): Pick<ThemeComponents, 'MuiCssBaseline'> {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
        },
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
        },
        '#__next': {
          width: '100%',
          height: '100%',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
          '&[type=password]': {
            '&::-ms-reveal': {
              display: 'none',
            },
            '&::-ms-clear': {
              display: 'none',
            },
          },
        },
        img: {
          display: 'block',
          maxWidth: '100%',
        },
        ul: {
          margin: 0,
          padding: 0,
        },

        // Custom components
        '.MuiOtpInput-TextField': {
          '& .MuiFilledInput-input': {
            padding: 12,
          },
        },
      },
    },
  };
}
