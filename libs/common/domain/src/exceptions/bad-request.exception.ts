import { Exception } from './exception';
import { GENERAL_EXCEPTION_CODE } from './exceptions-code';

export class BadRequestException extends Exception<void> {
  constructor(message = 'Bad request') {
    super({
      httpStatusCode: 400,
      code: GENERAL_EXCEPTION_CODE.BAD_REQUEST,
      message,
    });
  }
}
