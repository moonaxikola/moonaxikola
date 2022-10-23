import { ResendConfirmationEmailEvent, UserNotFoundException, IUserRepository } from '@moona/user/domain';
import { BadRequestException, EventEmitter } from '@moona/common/domain';
import assert from 'node:assert';

import {
  IResendConfirmationEmailUseCase,
  ResendConfirmationEmailUseCasePayload,
} from './resend-confirmation-email.interfaces';

export class ResendConfirmationEmailUseCase implements IResendConfirmationEmailUseCase {
  constructor(private readonly userRepository: IUserRepository, private readonly event: EventEmitter) {}

  async execute({ email }: ResendConfirmationEmailUseCasePayload) {
    const user = await this.userRepository.findByEmail(email);

    assert(user, new UserNotFoundException('email', email));

    assert(!user.emailVerifiedAt, new BadRequestException('Email already verified'));

    this.event.dispatch(new ResendConfirmationEmailEvent(user.toProps()));
  }
}
