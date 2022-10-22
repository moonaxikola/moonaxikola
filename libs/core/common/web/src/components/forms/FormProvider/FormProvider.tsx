import { FormProvider as ReactHookFormProvider } from 'react-hook-form';

import { FormProviderProps } from './FormProvider.types';

export function FormProvider({ children, onSubmit, methods }: FormProviderProps) {
  return (
    <ReactHookFormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </ReactHookFormProvider>
  );
}
