import { Matches, ValidationOptions } from 'class-validator';

export const USERNAME_REGEX = /^[A-Za-z][A-Za-z0-9_.]{2,29}$/;

export const usernameRegexMessage =
  'Username must contain at least 3 characters and only letters, numbers, underscores and dots, and start with a letter';

export const IsUsername = (
  validationOptions: ValidationOptions = {
    message: usernameRegexMessage,
  },
) => {
  return Matches(USERNAME_REGEX, validationOptions);
};
