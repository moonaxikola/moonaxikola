import { SignUpUseCasePayload } from '@moona/user/use-cases';

export type SignUpRequest = SignUpUseCasePayload & {
  confirmPassword: string;
};

export type SignUpResponse = void;
