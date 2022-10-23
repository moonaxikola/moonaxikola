import { Container, Typography } from '@mui/material';
import { ReactElement } from 'react';

import { AuthLayout } from '../components';

export default function SignInPage() {
  return (
    <Container>
      <Typography component="h1" variant="h1">
        Sign In
      </Typography>
    </Container>
  );
}

SignInPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
