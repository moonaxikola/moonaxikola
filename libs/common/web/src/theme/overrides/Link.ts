import { Theme } from '@mui/material/styles';

import { ThemeComponents } from '../Theme.types';

export default function Link(theme: Theme): Pick<ThemeComponents, 'MuiLink'> {
  return {
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
  };
}
