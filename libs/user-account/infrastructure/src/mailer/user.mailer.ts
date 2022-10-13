import { User, UserMailerPort } from '@moona-backend/user-account/domain';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserMailer implements UserMailerPort {
  private readonly logger = new Logger(UserMailer.name);

  async sendWelcomeEmail(user: User): Promise<void> {
    this.logger.debug(`Sending welcome email to ${user.email}`);
  }

  async sendVerificationEmail(user: User): Promise<void> {
    this.logger.debug(`Sending verification email to ${user.email}`);
  }
}
