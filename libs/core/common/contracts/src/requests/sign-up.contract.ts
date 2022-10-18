import { SignUpUseCasePayload } from '@moona/core/user/use-cases';

export type SignUpRequest = SignUpUseCasePayload & {
  confirmPassword: string;
};

export type SignUpResponse = void;
