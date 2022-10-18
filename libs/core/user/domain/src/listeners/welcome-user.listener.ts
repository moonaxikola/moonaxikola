import { EventListener } from '@moona/core/common/domain';

import { IUserMailer } from '../ports';
import { UserCreatedEvent } from '../events';

export class WelcomeUserListener implements EventListener<UserCreatedEvent> {
  constructor(private readonly userMailer: IUserMailer) {}

  async handle(event: UserCreatedEvent): Promise<void> {
    await this.userMailer.sendVerificationEmail(event.data);
    await this.userMailer.sendWelcomeEmail(event.data);
  }
}
