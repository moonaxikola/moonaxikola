import { ResetPasswordUseCasePayload } from '@moona/core/user/use-cases';

export type ResetPasswordRequest = ResetPasswordUseCasePayload & {
  confirmNewPassword: string;
};

export type ResetPasswordResponse = void;
