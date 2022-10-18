import assert from 'node:assert';
import { IUserRepository } from '@moona/core/user/domain';
import { BadRequestException } from '@moona/core/common/domain';

import { ResetPasswordUseCasePayload, IResetPasswordUseCase } from './reset-password.interfaces';

export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ token, newPassword }: ResetPasswordUseCasePayload) {
    const email = await this.userRepository.getEmailByPasswordResetToken(token);
    assert.ok(email, new BadRequestException('Invalid reset token'));

    const user = await this.userRepository.findByEmail(email);
    assert.ok(user, new BadRequestException('Invalid reset token'));

    await user.changePassword(newPassword);
    await this.userRepository.update(user);
    await this.userRepository.deletePasswordResetToken(token);
  }
}
