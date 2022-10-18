import { UseCase } from '@moona/core/common/use-cases';

export interface ResendConfirmationEmailUseCasePayload {
  email: string;
}

export type IResendConfirmationEmailUseCase = UseCase<ResendConfirmationEmailUseCasePayload, void>;
