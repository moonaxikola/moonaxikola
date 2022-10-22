import { Event } from '@moona/core/common/domain';

import { UserProps } from '../interfaces';

export class PasswordResetEvent implements Event<UserProps> {
  static readonly eventName = 'password.forgot';
  // TODO: find a way to remove duplication
  public readonly eventName = PasswordResetEvent.eventName;

  constructor(public readonly data: UserProps) {}
}
