import { User } from '@moona/core/common/data-access';

export type SignUpRequest = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export type SignUpResponse = User;
