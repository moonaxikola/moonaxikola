import { FormError } from '@moona/common/web';
import { SignInRequest } from '@moona/common/contracts';

export type SignInFormValues = SignInRequest;

export type SignInFormProps = {
  errors?: FormError<SignInFormValues>[];
  onSubmit: (values: SignInFormValues) => void;
};
