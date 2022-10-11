import { User } from '../../entities';
import { UserMailerPort } from '../user-mailer.port';

export class UserMailerMock implements UserMailerPort {
  async sendWelcomeEmail(user: User): Promise<void> {
    return;
  }
  async sendVerificationEmail(user: User): Promise<void> {
    return;
  }
}
