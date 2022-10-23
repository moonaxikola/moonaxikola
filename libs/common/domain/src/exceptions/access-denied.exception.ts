import { Exception } from './exception';
import { GENERAL_EXCEPTION_CODE } from './exceptions-code';

export class AccessDeniedException extends Exception<void> {
  constructor(message = 'Access denied') {
    super({
      httpStatusCode: 403,
      code: GENERAL_EXCEPTION_CODE.ACCESS_DENIED,
      message,
    });
  }
}
