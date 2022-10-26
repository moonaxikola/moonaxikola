import { useRouter } from 'next/router';
import { Alert } from '@mui/material';
import { useConfirmEmail } from '@moona/user/data-access';
import { ConfirmEmailOtpForm } from '@moona/user/web';

import * as routes from '../../../routes';

export function ConfirmEmailForm() {
  const router = useRouter();
  const { email } = router.query;
  const { mutate, error, isLoading } = useConfirmEmail({
    onSuccess: () => router.push(routes.home()),
  });

  return (
    <>
      <ConfirmEmailOtpForm email={email.toString()} onSubmit={mutate} error={error} isLoading={isLoading} />

      {error && (
        <Alert severity="error" sx={{ my: 3 }}>
          {error.message}
        </Alert>
      )}
    </>
  );
}
