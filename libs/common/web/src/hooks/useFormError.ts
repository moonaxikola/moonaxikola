import { useEffect } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import { FormError } from '../interfaces';

/**
 * Hook to handle form errors
 *
 * @param errors - API form errors
 * @param methods - React hook form methods
 */
export function useFormErrors<T extends FieldValues>(errors: FormError<T>[], methods: UseFormReturn<T>) {
  useEffect(() => {
    errors?.forEach(error => methods.setError(error.field, { message: error.message }));
  }, [methods, errors]);
}
