import { UserProps, UserMailerPort } from '@moona-backend/user/domain';
import { NovuService } from '@moona-backend/common/infrastructure';
import { randomString } from '@moona-backend/common/utils';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserRepository } from '../repositories';

@Injectable()
export class UserMailer implements UserMailerPort {
  constructor(
    private readonly novu: NovuService,
    private readonly config: ConfigService,
    private readonly userRepository: UserRepository,
  ) {}

  async sendWelcomeEmail(user: UserProps): Promise<void> {
    this.novu.trigger('user-welcome-email', {
      to: {
        subscriberId: user.id,
      },
      payload: {
        firstName: user.firstName,
      },
    });
  }

  async sendVerificationEmail(user: UserProps): Promise<void> {
    const token = randomString(32);
    const url = new URL(this.config.get('frontend.emailVerificationUrl'));
    url.searchParams.append('token', token);

    await this.userRepository.saveEmailConfirmationToken(user.email, token);

    this.novu.trigger('user-verification-email', {
      to: {
        subscriberId: user.id,
      },
      payload: {
        firstName: user.firstName,
        url: url.href,
      },
    });
  }

  async sendPasswordResetEmail(user: UserProps): Promise<void> {
    const token = randomString(32);
    const url = new URL(this.config.get('frontend.passwordResetUrl'));
    url.searchParams.append('token', token);

    await this.userRepository.savePasswordResetToken(user.email, token);

    this.novu.trigger('user-forgot-password-email', {
      to: {
        subscriberId: user.id,
      },
      payload: {
        firstName: user.firstName,
        url: url.href,
      },
    });
  }
}
