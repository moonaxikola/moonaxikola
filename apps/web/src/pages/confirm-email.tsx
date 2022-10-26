import { ReactElement } from 'react';
import { Typography, Box } from '@mui/material';
import { NextLink } from '@moona/common/web';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getValueOrUndefined } from '@moona/common/utils';

import * as routes from '../routes';
import { ConfirmEmailForm } from '../components/sections/confirm-email';

export default function ConfirmEmailPage({
  email,
  displayName,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
      <Box width={380} textAlign="center">
        <Typography component="h1" variant="h3" gutterBottom>
          Por favor, confirme o seu email!
        </Typography>

        <Typography component="p" variant="body1" marginBottom={4} color="text.disabled">
          Olá {displayName}, por favor, confirme o seu email para continuar. Enviamos um email para {email}{' '}
          com um código de confirmação. Por favor, insira o código abaixo para confirmar o seu e-mail.
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

export const getServerSideProps: GetServerSideProps<{ displayName: string; email: string }> = async ({
  query,
}) => {
  const email = getValueOrUndefined()
    .condition(typeof query.email === 'string')
    .value(query.email) as string;

  const displayName = getValueOrUndefined()
    .condition(typeof query.displayName === 'string')
    .value(query.displayName) as string;

  if (!displayName || !email) {
    return { notFound: true };
  }

  return {
    props: { email, displayName },
  };
};
