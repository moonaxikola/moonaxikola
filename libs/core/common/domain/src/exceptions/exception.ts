import { Optional } from '@moona/core/common/utils';

import { CreateExceptionPayload, CodeDescription } from '../interfaces';

export class Exception<Data> extends Error {
  public readonly code: string;

  public readonly httpStatusCode: number = 500;

  public readonly data: Optional<Data>;

  public static new<Data>(payload: CreateExceptionPayload<Data>) {
    return new Exception(payload.code, payload.overrideMessage, payload.data);
  }

  protected constructor(codeDescription: CodeDescription, overrideMessage?: string, data?: Data) {
    super();

    this.name = this.constructor.name;
    this.code = codeDescription.code;
    this.httpStatusCode = codeDescription.httpStatusCode;
    this.data = data;
    this.message = overrideMessage || codeDescription.message;

    Error.captureStackTrace(this, this.constructor);
  }
}
