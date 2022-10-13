import { UserCreatedEvent, WelcomeUserListener } from '@moona-backend/user-account/domain';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { UserMailer } from '../mailer';

@Injectable()
export class UserAccountListener {
  constructor(private readonly userMailer: UserMailer) {}

  @OnEvent(UserCreatedEvent.eventName)
  async handleUserCreatedEvent(event: UserCreatedEvent) {
    await new WelcomeUserListener(this.userMailer).handle(event);
  }
}
