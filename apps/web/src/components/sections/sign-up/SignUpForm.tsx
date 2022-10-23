import { useState } from 'react';
import { useRouter } from 'next/router';
import { Alert } from '@mui/material';
import { useSignUp } from '@moona/user/data-access';
import { SignUpForm, SignUpFormValues } from '@moona/user/web';
import { FormError } from '@moona/common/web';

import * as routes from '../../../routes';

function SignUpFormContainer() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormError<SignUpFormValues>[]>([]);
  const { mutateAsync: signUp, error } = useSignUp();

  const handleSubmit = async (variables: SignUpFormValues) => {
    setErrorMessage(null);
    setErrors([]);

    try {
      const response = await signUp(variables);
      router.push(routes.verifyEmail(variables.email, variables.firstName));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <SignUpForm onSubmit={handleSubmit} errors={errors} />

      {errorMessage && (
        <Alert severity="error" sx={{ my: 3 }}>
          {errorMessage}
        </Alert>
      )}
    </>
  );
}

export { SignUpFormContainer as SignUpForm };
