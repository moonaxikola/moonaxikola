import Image from 'next/image';
import { Container, Typography, Box, Stack, Button } from '@mui/material';
import { Logo, NextLink } from '@moona/common/web';

export default function HomePage() {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100%' }}>
      <Box marginBottom={12}>
        <Image src="/img/others/under_construction.png" width={320} height={343} alt="Under construction" />
      </Box>

      <Logo mode="icon" height={120} />
      <Typography component="h1" variant="h1" color="primary" marginBottom={4}>
        Moonaxikola
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button LinkComponent={NextLink} variant="contained" href="/sign-up">
          Sign up
        </Button>
        <Button LinkComponent={NextLink} variant="text" href="/sign-in">
          Sign in
        </Button>
      </Stack>
    </Container>
  );
}
