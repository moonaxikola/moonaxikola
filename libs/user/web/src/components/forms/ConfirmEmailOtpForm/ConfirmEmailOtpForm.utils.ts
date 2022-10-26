import * as Yup from 'yup';

import { ConfirmEmailOtpFormValues } from './ConfirmEmailOtpForm.types';

export const validationSchema = Yup.object().shape({
  code: Yup.string().min(6).required('OTP code is required'),
  email: Yup.string().email().required('Email is required'),
});

export const defaultValues: ConfirmEmailOtpFormValues = {
  code: '',
  email: '',
};
