import { UseCase } from '@moona/common/use-cases';

export interface ConfirmEmailUseCasePayload {
  code: string;
  email: string;
}

export type IConfirmEmailUseCase = UseCase<ConfirmEmailUseCasePayload, void>;
