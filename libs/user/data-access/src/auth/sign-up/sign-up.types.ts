import { User } from '@moona/common/data-access';

export type SignUpRequest = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export type SignUpResponse = User;
