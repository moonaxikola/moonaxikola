import { useRouter } from 'next/router';
import { Alert } from '@mui/material';
import { useSignIn } from '@moona/user/data-access';
import { SignInForm, SignInFormValues } from '@moona/user/web';

import * as routes from '../../../routes';

function SignInFormContainer() {
  const router = useRouter();
  const { mutateAsync: signIn, error } = useSignIn();

  const handleSubmit = async (variables: SignInFormValues) => {
    try {
      await signIn(variables);
      router.push(routes.home());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <SignInForm onSubmit={handleSubmit} />

      {error && (
        <Alert severity="error" sx={{ my: 3 }}>
          {error.message}
        </Alert>
      )}
    </>
  );
}

export { SignInFormContainer as SignInForm };
