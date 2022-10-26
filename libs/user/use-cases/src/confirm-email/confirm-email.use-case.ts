import { IUserRepository } from '@moona/user/domain';
import { BadRequestException } from '@moona/common/domain';
import assert from 'node:assert';

import { ConfirmEmailUseCasePayload, IConfirmEmailUseCase } from './confirm-email.interfaces';

export class ConfirmEmailUseCase implements IConfirmEmailUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ code, email }: ConfirmEmailUseCasePayload) {
    const storedCode = await this.userRepository.getEmailConfirmationCode(email);

    assert.ok(storedCode, new BadRequestException('Invalid confirmation token'));
    assert.ok(storedCode === code, new BadRequestException('Invalid confirmation token'));

    await this.userRepository.markEmailAsConfirmed(email);
  }
}
