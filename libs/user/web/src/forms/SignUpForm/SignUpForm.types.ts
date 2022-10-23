import { FormError } from '@moona/common/web';
import { SignUpRequest } from '@moona/user/data-access';

export type SignUpFormValues = SignUpRequest;

export type SignUpFormProps = {
  errors?: FormError<SignUpFormValues>[];
  onSubmit: (values: SignUpFormValues) => void;
};
