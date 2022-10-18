import { ChangePasswordUseCasePayload } from '@moona/core/user/use-cases';

export type ChangePasswordRequest = Omit<ChangePasswordUseCasePayload, 'user'> & {
  confirmNewPassword: string;
};

export type ChangePasswordResponse = void;
