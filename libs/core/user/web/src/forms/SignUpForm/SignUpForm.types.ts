import { SignUpRequest } from '@moona/core/user/data-access';

export type SignUpFormValues = SignUpRequest;

export type SignUpFormProps = {
  onSubmit: (values: SignUpFormValues) => void;
};
