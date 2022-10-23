import { UseCase } from '@moona/common/use-cases';

export interface ForgotPasswordUseCasePayload {
  email: string;
}

export type IForgotPasswordUseCase = UseCase<ForgotPasswordUseCasePayload, void>;
