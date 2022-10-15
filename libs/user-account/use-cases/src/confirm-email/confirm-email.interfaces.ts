import { UseCase } from '@moona-backend/common/use-cases';

export interface ConfirmEmailUseCasePayload {
  token: string;
}

export type IConfirmEmailUseCase = UseCase<ConfirmEmailUseCasePayload, void>;
