import { useRouter } from 'next/router';
import { Alert } from '@mui/material';
import { useSignIn } from '@moona/user/data-access';
import { SignInForm } from '@moona/user/web';

import * as routes from '../../../routes';

function SignInFormContainer() {
  const router = useRouter();
  const { mutate, error, isLoading } = useSignIn({
    onSuccess: () => router.push(routes.home()),
  });

  return (
    <>
      <SignInForm onSubmit={mutate} error={error} isLoading={isLoading} />

      {error && (
        <Alert severity="error" sx={{ my: 3 }}>
          {error.message}
        </Alert>
      )}
    </>
  );
}

export { SignInFormContainer as SignInForm };
