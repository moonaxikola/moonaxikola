import { styled } from '@mui/material/styles';

import type { LogoProps } from './Logo.types';

export const Root = styled('svg')(({ theme }) => ({
  fill: theme.palette.primary.main,
}));

export const TextContainer = styled('g')<Pick<LogoProps, 'mode'>>(({ theme, mode }) => ({
  display: mode === 'icon' ? 'none' : undefined,
}));

export const HoleContainer = styled('g')<Pick<LogoProps, 'mode'>>(({ theme, mode }) => ({
  fill: theme.palette.background.paper,
  display: mode === 'icon' ? 'none' : undefined,
}));
