import {
  UserCreatedEvent,
  PasswordResetEvent,
  ResendConfirmationEmailEvent,
  WelcomeUserListener,
} from '@moona-backend/core/user/domain';
import { NovuService } from '@moona-backend/core/common/infrastructure';
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

  @OnEvent(ResendConfirmationEmailEvent.eventName)
  async handleResendConfirmationEmailEvent(event: ResendConfirmationEmailEvent) {
    await this.userMailer.sendVerificationEmail(event.data);
  }

  @OnEvent(PasswordResetEvent.eventName)
  async handlePasswordResetEvent(event: PasswordResetEvent) {
    await this.userMailer.sendPasswordResetEmail(event.data);
  }
}
