import { Event } from '@moona/core/common/domain';

import { UserProps } from '../interfaces';

export class UserCreatedEvent implements Event<UserProps> {
  static readonly eventName = 'user.created';
  // TODO: find a way to remove duplication
  public readonly eventName = UserCreatedEvent.eventName;

  constructor(public readonly data: UserProps) {}
}
