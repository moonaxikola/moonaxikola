import { ChangePasswordUseCasePayload } from '@moona-backend/core/user/use-cases';

export type ChangePasswordRequest = Omit<ChangePasswordUseCasePayload, 'user'> & {
  confirmNewPassword: string;
};

export type ChangePasswordResponse = void;
