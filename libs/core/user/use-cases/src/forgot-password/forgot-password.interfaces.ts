import { UseCase } from '@moona/core/common/use-cases';

export interface ForgotPasswordUseCasePayload {
  email: string;
}

export type IForgotPasswordUseCase = UseCase<ForgotPasswordUseCasePayload, void>;
