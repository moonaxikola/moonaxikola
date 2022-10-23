import { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { NextLink } from '@moona/common/web';

import { AuthLayout } from '../components';
import { SignInForm } from '../components/sections/sign-in';
export default function SignInPage() {
  return (
    <>
      <Typography component="h1" variant="h2" marginBottom={4}>
        Entrar
      </Typography>

      <SignInForm />

      <Typography textAlign="center" marginTop={4}>
        Ainda não é um Moona?{' '}
        <NextLink href="/sign-up" variant="body1">
          Criar conta
        </NextLink>
      </Typography>
    </>
  );
}

SignInPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
