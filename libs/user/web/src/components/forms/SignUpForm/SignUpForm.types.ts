import { BaseFormProps } from '@moona/common/web';
import { SignUpRequest } from '@moona/common/contracts';

export type SignUpFormValues = SignUpRequest;

export type SignUpFormProps = BaseFormProps<SignUpFormValues>;
