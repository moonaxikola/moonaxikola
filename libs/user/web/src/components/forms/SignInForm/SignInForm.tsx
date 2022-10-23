import { FormProvider, TextField, PasswordField, useFormErrors } from '@moona/common/web';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';

import { SignInFormProps, SignInFormValues } from './SignInForm.types';
import { validationSchema, defaultValues } from './SignInForm.utils';

export function SignInForm({ onSubmit, errors = [] }: SignInFormProps) {
  const methods = useForm<SignInFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  useFormErrors(errors, methods);

  return (
    <Stack spacing={2} component={FormProvider} methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <TextField name="email" type="email" label="Email address" required />
      <PasswordField name="password" label="Password" required />

      <LoadingButton type="submit" fullWidth loading={methods.formState.isSubmitting}>
        Entrar
      </LoadingButton>
    </Stack>
  );
}
