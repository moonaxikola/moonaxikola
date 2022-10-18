import { EntityNotFoundException } from '@moona/core/common/domain';

export class UserNotFoundException extends EntityNotFoundException {
  constructor(field: string, value: string) {
    super('User', field, value);
  }
}
