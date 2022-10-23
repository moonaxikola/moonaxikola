import type { TextFieldProps as MUITextFieldProps } from '@mui/material';

export type PasswordFieldProps = Omit<MUITextFieldProps, 'type' | 'InputProps'> & {
  name: string;
  showConstraintIndicator?: boolean;
};

export type PasswordSecurityIndicatorProps = {
  password: string;
};
