import type { ReactNode } from 'react';
import type { UseFormReturn } from 'react-hook-form';

export type FormProviderProps = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
};
