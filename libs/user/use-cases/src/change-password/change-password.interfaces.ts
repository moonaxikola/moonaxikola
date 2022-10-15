import { UseCase } from '@moona-backend/common/use-cases';
import { User } from '@moona-backend/user/domain';

export interface ChangePasswordUseCasePayload {
  user: User;
  oldPassword: string;
  newPassword: string;
}

export type IChangePasswordUseCase = UseCase<ChangePasswordUseCasePayload, void>;
