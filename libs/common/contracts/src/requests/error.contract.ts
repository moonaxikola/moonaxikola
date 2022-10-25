type Field = string;

type Message = string;

export interface RequestError {
  code: string;
  message: string;
  errors?: Record<Field, Message[]>[];
}
