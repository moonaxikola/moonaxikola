import { EventListener } from '@moona-backend/common/domain';

import { UserMailerPort } from '../ports';
import { UserCreatedEvent } from '../events';

export class WelcomeUserListener implements EventListener<UserCreatedEvent> {
  constructor(private readonly userMailer: UserMailerPort) {}

  async handle(event: UserCreatedEvent): Promise<void> {
    await this.userMailer.sendVerificationEmail(event.data);
    await this.userMailer.sendWelcomeEmail(event.data);
  }
}
