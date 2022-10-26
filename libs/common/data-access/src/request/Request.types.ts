import { QueryClient, UseMutationOptions } from '@tanstack/react-query';
import { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { ReactNode } from 'react';

export type RequestContextPayload = AxiosInstance;

export type RequestProviderProps = {
  children: ReactNode;
  config?: CreateAxiosDefaults;
  queryClient?: QueryClient;
};

export type MutationOptions<TData, TError, TVariables, TContext = unknown> = Omit<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  'mutationFn'
>;
