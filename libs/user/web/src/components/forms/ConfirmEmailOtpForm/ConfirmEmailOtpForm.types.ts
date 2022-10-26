import { ConfirmEmailRequest } from '@moona/common/contracts';
import { BaseFormProps } from '@moona/common/web';

export type ConfirmEmailOtpFormValues = ConfirmEmailRequest;

export type ConfirmEmailOtpFormProps = BaseFormProps<ConfirmEmailOtpFormValues> & {
  email: string;
};
