import { Optional } from '@moona/common/utils';

import { CreateExceptionPayload, CodeDescription } from '../interfaces';

export class Exception<Data> extends Error {
  public readonly code: string;

  public readonly httpStatusCode: number = 500;

  public readonly data: Optional<Data>;

  public readonly field: Optional<string>;

  public static new<Data>(payload: CreateExceptionPayload<Data>) {
    return new Exception(payload.code, payload.overrideMessage, payload.data);
  }

  protected constructor(codeDescription: CodeDescription, overrideMessage?: string, data?: Data) {
    super();

    this.name = this.constructor.name;
    this.code = codeDescription.code;
    this.httpStatusCode = codeDescription.httpStatusCode;
    this.data = data;
    this.field = codeDescription.field;
    this.message = overrideMessage || codeDescription.message;

    Error.captureStackTrace(this, this.constructor);
  }
}
