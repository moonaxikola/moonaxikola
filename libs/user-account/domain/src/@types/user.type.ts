export type UserProps = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  isEmailVerified: boolean;
};

export interface UserFactoryPayload extends Omit<UserProps, 'isEmailVerified'> {
  password: string;
}

export type CreateUserPayload = Omit<
  UserFactoryPayload,
  'id' | 'updatedAt' | 'createdAt' | 'isEmailVerified'
>;
