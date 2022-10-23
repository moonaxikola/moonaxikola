import * as Yup from 'yup';

import { SignInFormValues } from './SignInForm.types';

export const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const defaultValues: SignInFormValues = {
  email: '',
  password: '',
};
