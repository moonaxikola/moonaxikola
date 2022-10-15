import { Matches, ValidationOptions } from 'class-validator';

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;

export const IsPassword = (
  validationOptions: ValidationOptions = {
    message:
      'Password must contain at least 6 characters, one uppercase letter, one lowercase letter, one number and one special character',
  },
) => {
  return Matches(PASSWORD_REGEX, validationOptions);
};
