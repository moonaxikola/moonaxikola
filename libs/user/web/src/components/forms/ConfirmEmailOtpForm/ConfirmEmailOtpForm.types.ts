import { BaseFormProps } from '@moona/common/web';

export type ConfirmEmailOtpFormValues = {
  code: string;
};

export type ConfirmEmailOtpFormProps = BaseFormProps<ConfirmEmailOtpFormValues>;
