import { Exception } from './exception';
import { GENERAL_EXCEPTION_CODE } from './exceptions-code';

export class UnathorizedException extends Exception<void> {
  constructor(message = 'Unauthorized') {
    super({
      httpStatusCode: 401,
      code: GENERAL_EXCEPTION_CODE.UNATHORAZED,
      message,
    });
  }
}
