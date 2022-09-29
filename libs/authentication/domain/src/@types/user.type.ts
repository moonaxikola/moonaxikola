export type InstanciateUserPayload = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserPayload = Omit<InstanciateUserPayload, 'id' | 'updatedAt' | 'createdAt'>;
