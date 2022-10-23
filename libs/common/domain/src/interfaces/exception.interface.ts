export type CodeDescription = {
  code: string;
  httpStatusCode?: number;
  message: string;
  field?: string;
};

export type CreateExceptionPayload<Data> = {
  code: CodeDescription;
  overrideMessage?: string;
  data?: Data;
};
