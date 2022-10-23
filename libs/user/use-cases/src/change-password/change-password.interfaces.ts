import { UseCase } from '@moona/common/use-cases';
import { User } from '@moona/user/domain';

export interface ChangePasswordUseCasePayload {
  user: User;
  oldPassword: string;
  newPassword: string;
}

export type IChangePasswordUseCase = UseCase<ChangePasswordUseCasePayload, void>;
