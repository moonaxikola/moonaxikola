import { Event } from '@moona-backend/common/domain';

import { UserProps } from '../@types';

export class PasswordResetEvent implements Event<UserProps> {
  static readonly eventName = 'password.forgot';
  // TODO: find a way to remove duplication
  public readonly eventName = PasswordResetEvent.eventName;

  constructor(public readonly data: UserProps) {}
}
