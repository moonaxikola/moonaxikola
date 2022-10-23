import { FormProvider, TextField, PasswordField } from '@moona/common/web';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';

import { SignUpFormProps, SignUpFormValues } from './SignUpForm.types';
import { validationSchema, defaultValues } from './SignUpForm.utils';

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  const methods = useForm<SignUpFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  return (
    <Stack spacing={2} component={FormProvider} methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <Stack spacing={2} direction="row">
        <TextField name="firstName" label="First name" required />
        <TextField name="lastName" label="Last name" required />
      </Stack>
      <TextField name="email" type="email" label="Email address" required />
      <TextField name="username" label="Username" required />
      <PasswordField name="password" label="Password" showConstraintIndicator required />
      <PasswordField name="confirmPassword" label="Confirm password" required />

      <LoadingButton type="submit" fullWidth loading={methods.formState.isSubmitting}>
        Get started
      </LoadingButton>
    </Stack>
  );
}
