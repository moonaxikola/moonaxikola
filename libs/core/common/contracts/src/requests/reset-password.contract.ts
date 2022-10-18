import { ResetPasswordUseCasePayload } from '@moona-backend/core/user/use-cases';

export type ResetPasswordRequest = ResetPasswordUseCasePayload & {
  confirmNewPassword: string;
};

export type ResetPasswordResponse = void;
