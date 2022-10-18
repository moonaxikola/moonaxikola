import { UseCase } from '@moona-backend/core/common/use-cases';

export interface ConfirmEmailUseCasePayload {
  token: string;
}

export type IConfirmEmailUseCase = UseCase<ConfirmEmailUseCasePayload, void>;
