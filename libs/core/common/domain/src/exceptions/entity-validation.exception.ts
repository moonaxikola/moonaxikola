import { Exception } from './exception';
import { ENTITY_EXCEPTION_CODE } from './exceptions-code';

export class EntityValidationException<Data> extends Exception<Data> {
  constructor(entityName: string, data?: Data) {
    super(
      {
        httpStatusCode: 400,
        code: ENTITY_EXCEPTION_CODE.VALIDATION,
        message: `${entityName}: validation failed`,
      },
      null,
      data,
    );
  }
}
