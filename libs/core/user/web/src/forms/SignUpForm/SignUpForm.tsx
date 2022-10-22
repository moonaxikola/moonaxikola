import { FormProvider, TextField, PasswordField } from '@moona/core/common/web';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';

import { SignUpFormProps, SignUpFormValues } from './SignUpForm.types';
import { validationSchema, defaultValues } from './SignUpForm.utils';

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  const methods = useForm<SignUpFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <TextField name="firstName" label="First name" required margin="normal" />
      <TextField name="lastName" label="Last name" required margin="normal" />
      <TextField name="email" type="email" label="Email address" required margin="normal" />
      <TextField name="username" label="Username" margin="normal" />
      <PasswordField name="password" label="Password" required margin="normal" />
      <PasswordField name="confirmPassword" label="Confirm password" required margin="normal" />

      <LoadingButton type="submit" loading={methods.formState.isSubmitting}>
        Get started
      </LoadingButton>
    </FormProvider>
  );
}
