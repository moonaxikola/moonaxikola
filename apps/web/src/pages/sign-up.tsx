import { Typography } from '@mui/material';
import { useSignUp } from '@moona/user/data-access';
import { SignUpForm, SignUpFormValues } from '@moona/user/web';
import { NextLink } from '@moona/common/web';
import { ReactElement } from 'react';

import { AuthLayout } from '../components';

export default function SignUpPage() {
  const { mutateAsync: signUp } = useSignUp();

  const handleSubmit = async (variables: SignUpFormValues) => {
    const response = await signUp(variables);
  };

  return (
    <>
      <Typography component="h1" variant="h2" marginBottom={4}>
        Criar conta
      </Typography>
      <SignUpForm onSubmit={handleSubmit} />
      <Typography textAlign="center" marginTop={4}>
        Já tem uma conta?{' '}
        <NextLink href="/sign-in" variant="body1">
          Entrar
        </NextLink>
      </Typography>
    </>
  );
}

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
