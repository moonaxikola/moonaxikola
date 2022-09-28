export type CodeDescription = {
  code: number;
  message: string;
};

export type CreateExceptionPayload<Data> = {
  code: CodeDescription;
  overrideMessage?: string;
  data?: Data;
};
