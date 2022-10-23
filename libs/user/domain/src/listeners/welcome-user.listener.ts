import { EventListener } from '@moona/common/domain';

import { IUserMailer } from '../interfaces';
import { UserCreatedEvent } from '../events';

export class WelcomeUserListener implements EventListener<UserCreatedEvent> {
  constructor(private readonly userMailer: IUserMailer) {}

  async handle(event: UserCreatedEvent): Promise<void> {
    await this.userMailer.sendVerificationEmail(event.data);
    await this.userMailer.sendWelcomeEmail(event.data);
  }
}
