import { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { NextLink } from '@moona/common/web';

import { AuthLayout } from '../components';
import { SignUpForm } from '../components/sections/sign-up';

export default function SignUpPage() {
  return (
    <>
      <Typography component="h1" variant="h2" marginBottom={4}>
        Criar conta
      </Typography>

      <SignUpForm />

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
