import { UseCase } from '@moona/common/use-cases';

export interface ResetPasswordUseCasePayload {
  token: string;
  newPassword: string;
}

export type IResetPasswordUseCase = UseCase<ResetPasswordUseCasePayload, void>;
