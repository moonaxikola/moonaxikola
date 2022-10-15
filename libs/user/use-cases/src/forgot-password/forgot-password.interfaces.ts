import { UseCase } from '@moona-backend/common/use-cases';

export interface ForgotPasswordUseCasePayload {
  email: string;
}

export type IForgotPasswordUseCase = UseCase<ForgotPasswordUseCasePayload, void>;
