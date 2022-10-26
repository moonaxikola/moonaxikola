import { RequestError } from '@moona/common/contracts';
import { useEffect } from 'react';
import { FieldValues, UseFormReturn, Path } from 'react-hook-form';

import { formatFormErrors } from '../utils';

/**
 * Hook to handle form errors
 *
 * @param errors - API form errors
 * @param methods - React hook form methods
 */
export function useFormErrors<T extends FieldValues>(methods: UseFormReturn<T>, error?: RequestError) {
  useEffect(() => {
    if (error) {
      formatFormErrors(error).forEach(e => methods.setError(e.field as Path<T>, { message: e.message }));
    }
  }, [methods, error]);
}
