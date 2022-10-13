import { Exception } from './exception';
import { ENTITY_EXCEPTION_CODE } from './exceptions-code';

export class EntityAlreadyExistsException extends Exception<void> {
  constructor(entityName: string, field: string, value: string) {
    super({
      httpStatusCode: 409,
      code: ENTITY_EXCEPTION_CODE.ALREADY_EXISTS,
      message: `${entityName} with "${field}: ${value}" already exists`,
    });
  }
}
