import { SignUpUseCasePayload } from '@moona/user/use-cases';

import { User } from '../entities';

export type SignUpRequest = SignUpUseCasePayload & {
  confirmPassword: string;
};

export type SignUpResponse = Pick<User, 'email' | 'firstName'>;
