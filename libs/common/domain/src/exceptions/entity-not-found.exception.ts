import { Exception } from './exception';
import { ENTITY_EXCEPTION_CODE } from './exceptions-code';

export class EntityNotFoundException extends Exception<void> {
  constructor(entityName: string, field: string, value: string) {
    super({
      httpStatusCode: 404,
      code: ENTITY_EXCEPTION_CODE.NOT_FOUND,
      message: `${entityName} with "${field}: ${value}" not found`,
    });
  }
}
