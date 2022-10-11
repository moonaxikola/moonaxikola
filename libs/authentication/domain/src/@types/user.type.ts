export type UserProps = {
  id: string;
  email: string;
  password: string;
  emailVerifiedAt?: Date;
};

export type UserFactoryPayload = UserProps;
