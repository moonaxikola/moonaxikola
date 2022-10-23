import { Event } from '@moona/common/domain';

import { UserProps } from '../interfaces';

export class ResendConfirmationEmailEvent implements Event<UserProps> {
  static readonly eventName = 'email.confirmation.resend';
  // TODO: find a way to remove duplication
  public readonly eventName = ResendConfirmationEmailEvent.eventName;

  constructor(public readonly data: UserProps) {}
}
