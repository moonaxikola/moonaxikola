import { BadRequestException, ValidationError } from '@nestjs/common';

export function exceptionFactory(validationErrors: ValidationError[] = []) {
  const errors = validationErrors.map(error => {
    const { property, constraints } = error;

    return {
      property,
      message: constraints ? Object.values(constraints) : [],
    };
  });

  return new BadRequestException(errors);
}
