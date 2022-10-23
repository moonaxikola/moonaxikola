import { ResetPasswordUseCasePayload } from '@moona/user/use-cases';

export type ResetPasswordRequest = ResetPasswordUseCasePayload & {
  confirmNewPassword: string;
};

export type ResetPasswordResponse = void;
