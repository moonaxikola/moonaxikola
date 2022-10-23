import { UseCase } from '@moona/common/use-cases';

export interface ConfirmEmailUseCasePayload {
  token: string;
}

export type IConfirmEmailUseCase = UseCase<ConfirmEmailUseCasePayload, void>;
