import { NovuService } from '@moona-backend/common/infrastructure';
import { User, UserMailerPort } from '@moona-backend/user-account/domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserMailer implements UserMailerPort {
  constructor(private readonly novu: NovuService) {}

  async sendWelcomeEmail(user: User): Promise<void> {
    this.novu.trigger('user-welcome-email', {
      to: {
        subscriberId: user.id,
      },
      payload: {
        firstName: user.firstName,
      },
    });
  }

  async sendVerificationEmail(user: User): Promise<void> {
    this.novu.trigger('user-verification-email', {
      to: {
        subscriberId: user.id,
      },
      payload: {
        firstName: user.firstName,
        url: '<REPLACE_WITH_DATA>',
      },
    });
  }
}
