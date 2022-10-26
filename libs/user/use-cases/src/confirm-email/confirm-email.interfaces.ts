import { UseCase } from '@moona/common/use-cases';

export interface ConfirmEmailUseCasePayload {
  code: string;
}

export type IConfirmEmailUseCase = UseCase<ConfirmEmailUseCasePayload, void>;
