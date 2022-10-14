import { UserCreatedEvent, WelcomeUserListener } from '@moona-backend/user-account/domain';
import { NovuService } from '@moona-backend/common/infrastructure';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { UserMailer } from '../mailer';

@Injectable()
export class UserAccountListener {
  constructor(private readonly userMailer: UserMailer, private readonly novu: NovuService) {}

  @OnEvent(UserCreatedEvent.eventName)
  async handleUserCreatedEvent(event: UserCreatedEvent) {
    const { data: user } = event;

    await this.novu.subscribers.identify(user.id, {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    await new WelcomeUserListener(this.userMailer).handle(event);
  }
}
