import { IUserRepository } from '@moona-backend/core/user/domain';
import { UnathorizedException } from '@moona-backend/core/common/domain';
import assert from 'node:assert';

import { ChangePasswordUseCasePayload, IChangePasswordUseCase } from './change-password.interfaces';

export class ChangePasswordUseCase implements IChangePasswordUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(payload: ChangePasswordUseCasePayload) {
    const { newPassword, user, oldPassword } = payload;

    assert.ok(await user.comparePassword(oldPassword), new UnathorizedException('Old password is incorrect'));

    await user.changePassword(newPassword);

    await this.userRepository.update(user);
  }
}
