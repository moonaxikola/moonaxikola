import { BaseFormProps } from '@moona/common/web';
import { SignInRequest } from '@moona/common/contracts';

export type SignInFormValues = SignInRequest;

export type SignInFormProps = BaseFormProps<SignInFormValues>;
