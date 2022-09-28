import { validate as cvValidate } from 'class-validator';

export type ValidationResult = {
  context: string;
  errors: Array<{ property: string; message: string[] }>;
};

/**
 * Validate an object using class-validator
 *
 * @param target The object to validate
 * @param context The context or object name (optional)
 * @returns A promise that resolves to an object of validation errors or void if no errors
 */
export async function validate<Target extends object>(
  target: Target,
  context?: string,
): Promise<ValidationResult | void> {
  const errors = await cvValidate(target);

  if (errors.length === 0) return;

  return {
    context: context || target.constructor.name,
    errors: errors.map(({ property, constraints }) => ({
      property,
      message: constraints ? Object.values(constraints) : [],
    })),
  };
}
