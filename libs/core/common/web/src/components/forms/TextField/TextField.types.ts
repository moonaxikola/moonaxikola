import type { TextFieldProps as MUITextFieldProps } from '@mui/material';

export type TextFieldProps = MUITextFieldProps & {
  name: string;
};
