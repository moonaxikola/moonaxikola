import { ReactElement } from 'react';
import { Typography, Box } from '@mui/material';
import { NextLink } from '@moona/common/web';

import { ConfirmEmailForm } from '../components/sections/confirm-email';

export default function ConfirmEmailPage() {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
      <Box width={380} textAlign="center">
        <Typography component="h1" variant="h3" gutterBottom>
          Por favor, confirme o seu email!
        </Typography>

        <Typography component="p" variant="body1" marginBottom={4} color="text.disabled">
          Enviamos um email para você com um código de confirmação. Por favor, insira o código abaixo para
          confirmar o seu e-mail.
        </Typography>

        <ConfirmEmailForm />

        <Typography textAlign="center" marginTop={4} gutterBottom>
          Não recebeu o código?{' '}
          <NextLink href="/sign-up" variant="body1">
            Reenviar
          </NextLink>
        </Typography>

        <NextLink href="/sign-in" variant="body1">
          Voltar para a pagina de entrar
        </NextLink>
      </Box>
    </Box>
  );
}

ConfirmEmailPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
