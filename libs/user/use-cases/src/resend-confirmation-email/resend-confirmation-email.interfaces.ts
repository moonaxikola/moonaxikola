import { UseCase } from '@moona-backend/common/use-cases';

export interface ResendConfirmationEmailUseCasePayload {
  email: string;
}

export type IResendConfirmationEmailUseCase = UseCase<ResendConfirmationEmailUseCasePayload, void>;
