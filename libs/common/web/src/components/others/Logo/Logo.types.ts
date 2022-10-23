import { BoxProps } from '@mui/material';

export type LogoProps = Omit<BoxProps, 'children'> & {
  mode?: 'full' | 'icon';
  height?: number;
};
