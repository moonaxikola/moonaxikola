import { PasswordResetEvent, IUserRepository } from '@moona/core/user/domain';
import { EventEmitter } from '@moona/core/common/domain';

import { ForgotPasswordUseCasePayload, IForgotPasswordUseCase } from './forgot-password.interfaces';

export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
  constructor(private readonly userRepository: IUserRepository, private readonly event: EventEmitter) {}

  async execute({ email }: ForgotPasswordUseCasePayload) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return;
    }

    this.event.dispatch(new PasswordResetEvent(user.toProps()));
  }
}
