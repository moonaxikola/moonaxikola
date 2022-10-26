import { BadRequestException, ValidationError } from '@nestjs/common';

export function exceptionFactory(validationErrors: ValidationError[] = []) {
  const errors = validationErrors.map(error => {
    const { property, constraints } = error;

    const message = constraints ? Object.values(constraints) : [];

    return { [property]: message };
  });

  return new BadRequestException(errors);
}
