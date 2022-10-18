import { useFormContext, Controller } from 'react-hook-form';
import { TextField as MUITextField } from '@mui/material';

import { TextFieldProps } from './TextField.types';

export function TextField({ name, ...rest }: TextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MUITextField {...field} fullWidth error={!!error} helperText={error?.message} {...rest} />
      )}
    />
  );
}
