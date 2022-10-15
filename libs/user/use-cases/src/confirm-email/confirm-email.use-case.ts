import { UserRepositoryPort } from '@moona-backend/user/domain';
import { BadRequestException } from '@moona-backend/common/domain';
import assert from 'node:assert';

import { ConfirmEmailUseCasePayload, IConfirmEmailUseCase } from './confirm-email.interfaces';

export class ConfirmEmailUseCase implements IConfirmEmailUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute({ token }: ConfirmEmailUseCasePayload): Promise<void> {
    const email = await this.userRepository.getEmailByConfirmationToken(token);

    assert.ok(!!email, new BadRequestException('Invalid confirmation token'));

    await this.userRepository.markEmailAsConfirmed(email, token);
  }
}
