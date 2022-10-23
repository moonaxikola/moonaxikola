import { forwardRef } from 'react';
import { FormProvider as ReactHookFormProvider } from 'react-hook-form';

import { FormProviderProps } from './FormProvider.types';

export const FormProvider = forwardRef<HTMLFormElement, FormProviderProps>(
  ({ children, onSubmit, methods, ...rest }, ref) => {
    return (
      <ReactHookFormProvider {...methods}>
        <form ref={ref} onSubmit={onSubmit} {...rest}>
          {children}
        </form>
      </ReactHookFormProvider>
    );
  },
);
