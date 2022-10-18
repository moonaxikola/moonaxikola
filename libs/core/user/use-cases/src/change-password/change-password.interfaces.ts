import { UseCase } from '@moona-backend/core/common/use-cases';
import { User } from '@moona-backend/core/user/domain';

export interface ChangePasswordUseCasePayload {
  user: User;
  oldPassword: string;
  newPassword: string;
}

export type IChangePasswordUseCase = UseCase<ChangePasswordUseCasePayload, void>;
