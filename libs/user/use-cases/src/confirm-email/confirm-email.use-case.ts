import { IUserRepository } from '@moona/user/domain';
import { BadRequestException } from '@moona/common/domain';
import assert from 'node:assert';

import { ConfirmEmailUseCasePayload, IConfirmEmailUseCase } from './confirm-email.interfaces';

export class ConfirmEmailUseCase implements IConfirmEmailUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ token }: ConfirmEmailUseCasePayload) {
    const email = await this.userRepository.getEmailByConfirmationToken(token);

    assert.ok(email, new BadRequestException('Invalid confirmation token'));

    await this.userRepository.markEmailAsConfirmed(email, token);
  }
}
