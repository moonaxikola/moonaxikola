import { useRouter } from 'next/router';
import { Alert } from '@mui/material';
import { useSignUp } from '@moona/user/data-access';
import { SignUpForm } from '@moona/user/web';

import * as routes from '../../../routes';

function SignUpFormContainer() {
  const router = useRouter();
  const { mutate, error, isLoading } = useSignUp({
    onSuccess: data => router.push(routes.confirmEmail(data.email, data.firstName)),
  });

  const showAlertMessage = error && error.message && !error.errors;

  return (
    <>
      <SignUpForm onSubmit={mutate} error={error} isLoading={isLoading} />

      {showAlertMessage && (
        <Alert severity="error" sx={{ my: 3 }}>
          {error.message}
        </Alert>
      )}
    </>
  );
}

export { SignUpFormContainer as SignUpForm };
