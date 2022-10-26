import type { MuiOtpInputProps } from 'mui-one-time-password-input';

export type OtpTextFieldProps = Omit<MuiOtpInputProps, 'helperText'> & {
  name: string;
};
