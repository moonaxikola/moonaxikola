import { Event } from '@moona-backend/common/domain';

import { UserProps } from '../@types';

export class ResendConfirmationEmailEvent implements Event<UserProps> {
  static readonly eventName = 'email.confirmation.resend';
  // TODO: find a way to remove duplication
  public readonly eventName = ResendConfirmationEmailEvent.eventName;

  constructor(public readonly data: UserProps) {}
}
