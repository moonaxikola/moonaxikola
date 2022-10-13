import { EntityAlreadyExistsException } from '@moona-backend/common/domain';

export class UserAlreadyExistsException extends EntityAlreadyExistsException {
  constructor(field: string, value: string) {
    super('User', field, value);
  }
}
