import { ENTITY_EXCEPTION_CODE, Exception } from '@moona-backend/common/domain';

export class UserAlreadyExistsException extends Exception<void> {
  constructor() {
    super({
      code: ENTITY_EXCEPTION_CODE.ALREADY_EXISTS,
      message: 'User already exists',
    });
  }
}
