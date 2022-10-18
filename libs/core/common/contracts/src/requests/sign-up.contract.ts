import { SignUpUseCasePayload } from '@moona-backend/core/user/use-cases';

export type SignUpRequest = SignUpUseCasePayload & {
  confirmPassword: string;
};

export type SignUpResponse = void;
