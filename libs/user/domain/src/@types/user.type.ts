export type UserProps = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  emailVerifiedAt?: Date;
};

export interface UserFactoryPayload extends UserProps {
  password: string;
}

export type CreateUserPayload = Omit<
  UserProps,
  'id' | 'updatedAt' | 'createdAt' | 'isEmailVerified' | 'emailVerifiedAt'
> & {
  password: string;
};
