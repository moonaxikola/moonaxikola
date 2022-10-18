import {
  PASSWORD_REGEX,
  USERNAME_REGEX,
  passwordRegexMessage,
  usernameRegexMessage,
} from '@moona/core/common/utils';
import * as Yup from 'yup';

import { SignUpFormValues } from './SignUpForm.types';

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  username: Yup.string().matches(USERNAME_REGEX, usernameRegexMessage).required('Username is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string().matches(PASSWORD_REGEX, passwordRegexMessage).required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const defaultValues: SignUpFormValues = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};
