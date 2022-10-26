import { RequestError } from '@moona/common/contracts';

import { FormError } from '../interfaces';

export function formatFormErrors(error: RequestError): FormError<any>[] {
  if (!error || !error.errors) {
    return [];
  }

  return error.errors.map(validationError => {
    return Object.entries(validationError).reduce(
      (_, [field, messages]) => {
        return {
          field,
          message: messages.join('\n'),
        };
      },
      { field: '', message: '' },
    );
  });
}
