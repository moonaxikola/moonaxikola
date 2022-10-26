import { RequestError } from '@moona/common/contracts';
import { Path } from 'react-hook-form';

export interface FormError<T> {
  field: Path<T>;
  message: string;
}

export interface BaseFormProps<FormValues> {
  error?: RequestError;
  onSubmit: (values: FormValues) => void;
  isLoading?: boolean;
}
