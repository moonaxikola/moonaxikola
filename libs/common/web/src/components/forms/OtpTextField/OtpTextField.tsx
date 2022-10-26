import { useFormContext, Controller } from 'react-hook-form';
import { FormHelperText } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';

import type { OtpTextFieldProps } from './OtpTextField.types';

export function OtpTextField({ name, ...rest }: OtpTextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <MuiOtpInput {...field} {...rest} />
          {error && <FormHelperText error>{error.message}</FormHelperText>}
        </div>
      )}
    />
  );
}
