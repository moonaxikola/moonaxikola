import { UseCase } from '@moona/common/use-cases';

export interface ResendConfirmationEmailUseCasePayload {
  email: string;
}

export type IResendConfirmationEmailUseCase = UseCase<ResendConfirmationEmailUseCasePayload, void>;
