import { Path } from 'react-hook-form';

export interface FormError<T> {
  field: Path<T>;
  message: string;
}
