import { UserRepositoryPort } from '@moona-backend/user/domain';
import { UnathorizedException } from '@moona-backend/common/domain';
import assert from 'node:assert';

import { ChangePasswordUseCasePayload, IChangePasswordUseCase } from './change-password.interfaces';

export class ChangePasswordUseCase implements IChangePasswordUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(payload: ChangePasswordUseCasePayload): Promise<void> {
    const { newPassword, user, oldPassword } = payload;

    assert.ok(await user.comparePassword(oldPassword), new UnathorizedException('Old password is incorrect'));

    await user.changePassword(newPassword);

    await this.userRepository.update(user);
  }
}
