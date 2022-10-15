import { PasswordResetEvent, UserRepositoryPort } from '@moona-backend/user/domain';
import { EventEmitter } from '@moona-backend/common/domain';

import { ForgotPasswordUseCasePayload, IForgotPasswordUseCase } from './forgot-password.interfaces';

export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
  constructor(private readonly userRepository: UserRepositoryPort, private readonly event: EventEmitter) {}

  async execute({ email }: ForgotPasswordUseCasePayload): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return;
    }

    this.event.dispatch(new PasswordResetEvent(user.toProps()));
  }
}
