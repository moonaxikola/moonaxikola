import { Container, Typography } from '@mui/material';
import { useSignUp } from '@moona/core/user/data-access';
import { SignUpForm, SignUpFormValues } from '@moona/core/user/web';

export default function HomePage() {
  const { mutateAsync: signUp } = useSignUp();

  const handleSubmit = async (variables: SignUpFormValues) => {
    const response = await signUp(variables);
  };

  return (
    <Container>
      <Typography component="h1" variant="h1">
        Moonaxikola
      </Typography>

      <SignUpForm onSubmit={handleSubmit} />
    </Container>
  );
}
