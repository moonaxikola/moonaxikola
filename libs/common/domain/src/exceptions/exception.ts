import { Optional, CreateExceptionPayload, CodeDescription } from '../@types';

export class Exception<Data> extends Error {
  public readonly code: number;

  public readonly data: Optional<Data>;

  public static new<Data>(payload: CreateExceptionPayload<Data>) {
    return new Exception(payload.code, payload.overrideMessage, payload.data);
  }

  protected constructor(codeDescription: CodeDescription, overrideMessage?: string, data?: Data) {
    super();

    this.name = this.constructor.name;
    this.code = codeDescription.code;
    this.data = data;
    this.message = overrideMessage || codeDescription.message;

    Error.captureStackTrace(this, this.constructor);
  }
}
