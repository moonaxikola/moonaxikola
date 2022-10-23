import type { Components, Theme } from '@mui/material/styles';

import Button from './Button';
import Input from './Input';
import CssBaseline from './CssBaseline';
import Link from './Link';
import Typography from './Typography';

// TODO: fix typing
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function componentsOverrides(theme: Theme): Components<any> {
  return Object.assign(Input(theme), Button(theme), CssBaseline(theme), Link(theme), Typography(theme));
}
