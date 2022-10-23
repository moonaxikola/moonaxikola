import { FormError } from '@moona/common/web';
import { SignUpRequest } from '@moona/common/contracts';

export type SignUpFormValues = SignUpRequest;

export type SignUpFormProps = {
  errors?: FormError<SignUpFormValues>[];
  onSubmit: (values: SignUpFormValues) => void;
};
