import { FormProvider, OtpTextField, useFormErrors } from '@moona/common/web';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';

import { ConfirmEmailOtpFormProps, ConfirmEmailOtpFormValues } from './ConfirmEmailOtpForm.types';
import { validationSchema, defaultValues } from './ConfirmEmailOtpForm.utils';

export function ConfirmEmailOtpForm({ onSubmit, error, isLoading }: ConfirmEmailOtpFormProps) {
  const methods = useForm<ConfirmEmailOtpFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  useFormErrors(methods, error);

  return (
    <Stack spacing={2} component={FormProvider} methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <OtpTextField name="code" length={6} />

      <LoadingButton type="submit" fullWidth loading={isLoading}>
        Verificar
      </LoadingButton>
    </Stack>
  );
}
