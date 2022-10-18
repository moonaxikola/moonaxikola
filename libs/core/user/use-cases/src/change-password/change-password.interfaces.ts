import { UseCase } from '@moona/core/common/use-cases';
import { User } from '@moona/core/user/domain';

export interface ChangePasswordUseCasePayload {
  user: User;
  oldPassword: string;
  newPassword: string;
}

export type IChangePasswordUseCase = UseCase<ChangePasswordUseCasePayload, void>;
