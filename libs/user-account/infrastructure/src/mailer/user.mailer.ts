import { User, UserMailerPort } from '@moona-backend/user-account/domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserMailer implements UserMailerPort {
  async sendWelcomeEmail(user: User): Promise<void> {
    return;
  }

  async sendVerificationEmail(user: User): Promise<void> {
    return;
  }
}
