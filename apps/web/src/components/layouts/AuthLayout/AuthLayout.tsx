import { Typography, Container, Box } from '@mui/material';
import { Logo } from '@moona/common/web';

import type { AuthLayoutProps } from './AuthLayout.types';
import { Root, FormContainer, DescriptionContainer } from './AuthLayout.styles';

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Root>
      <DescriptionContainer>
        <Container maxWidth="sm" component="div">
          <Typography variant="h1" component="p" gutterBottom>
            Construída com amor, alimentada com o esforço, de angolanos para angolanos
          </Typography>
          <Typography>
            O Moonaxikola é uma comunidade de estudantes e profissionais angolanos visando alavancar o
            aprendizado e a integração profissional dos estudantes angolanos
          </Typography>
        </Container>
      </DescriptionContainer>

      <FormContainer>
        <Box>
          <Logo height={48} mode="full" />
          {children}
        </Box>
      </FormContainer>
    </Root>
  );
}
