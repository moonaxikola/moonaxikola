import { ChangePasswordUseCasePayload } from '@moona/user/use-cases';

export type ChangePasswordRequest = Omit<ChangePasswordUseCasePayload, 'user'> & {
  confirmNewPassword: string;
};

export type ChangePasswordResponse = void;
