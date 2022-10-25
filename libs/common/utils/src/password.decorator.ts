import { applyDecorators } from '@nestjs/common';
import { Matches, ValidationOptions, IsString } from 'class-validator';

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export const passwordRegexMessage =
  'Password must contain at least 6 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character';

export const IsPassword = (
  validationOptions: ValidationOptions = {
    message: passwordRegexMessage,
  },
) => {
  return applyDecorators(IsString(), Matches(PASSWORD_REGEX, validationOptions));
};
