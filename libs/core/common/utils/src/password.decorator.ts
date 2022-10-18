import { applyDecorators } from '@nestjs/common';
import { Matches, ValidationOptions, IsString } from 'class-validator';

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;

export const passwordRegexMessage =
  'Password must contain at least 6 characters, one uppercase letter, one lowercase letter, one number and one special character';

export const IsPassword = (
  validationOptions: ValidationOptions = {
    message: passwordRegexMessage,
  },
) => {
  return applyDecorators(IsString(), Matches(PASSWORD_REGEX, validationOptions));
};
