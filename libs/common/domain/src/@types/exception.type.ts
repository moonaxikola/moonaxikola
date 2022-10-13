export type CodeDescription = {
  code: number;
  httpStatusCode?: number;
  message: string;
};

export type CreateExceptionPayload<Data> = {
  code: CodeDescription;
  overrideMessage?: string;
  data?: Data;
};
