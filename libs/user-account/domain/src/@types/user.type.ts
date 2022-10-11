export type UserProps = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserFactoryPayload = UserProps;

export type CreateUserPayload = Omit<UserProps, 'id' | 'updatedAt' | 'createdAt'>;
