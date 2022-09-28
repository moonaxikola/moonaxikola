import { Exception } from './exception';
import { ENTITY_EXCEPTION_CODE } from './exceptions-code';

export class EntityEmptyIdException extends Exception<void> {
  constructor(entityName: string) {
    super({
      code: ENTITY_EXCEPTION_CODE.VALIDATION,
      message: `${entityName}: ID is empty.`,
    });
  }
}
