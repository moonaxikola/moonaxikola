import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { InputAdornment, TextField, IconButton, Stack } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import type { PasswordFieldProps } from './PasswordField.types';
import { PasswordSecurityIndicator } from './PasswordSecurityIndicator';

export function PasswordField({ name, showConstraintIndicator, ...rest }: PasswordFieldProps) {
  const { control } = useFormContext();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack spacing={1}>
          <TextField
            {...field}
            fullWidth
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            error={!!error}
            helperText={error?.message}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton tabIndex={-1} onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...rest}
          />
          {isFocused && showConstraintIndicator && <PasswordSecurityIndicator password={field.value} />}
        </Stack>
      )}
    />
  );
}
