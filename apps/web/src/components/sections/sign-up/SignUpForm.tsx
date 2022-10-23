import { useState } from 'react';
import { Alert } from '@mui/material';
import { useSignUp } from '@moona/user/data-access';
import { SignUpForm, SignUpFormValues } from '@moona/user/web';

function SignUpFormContainer() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutateAsync: signUp } = useSignUp();

  const handleSubmit = async (variables: SignUpFormValues) => {
    setErrorMessage(null);

    try {
      const response = await signUp(variables);
      // TODO: Redirect to verification page
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  return (
    <>
      <SignUpForm onSubmit={handleSubmit} />

      {errorMessage && (
        <Alert severity="error" sx={{ my: 3 }}>
          {errorMessage}
        </Alert>
      )}
    </>
  );
}

export { SignUpFormContainer as SignUpForm };
