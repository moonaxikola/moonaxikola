import { createContext, useMemo } from 'react';
import axios from 'axios';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { RequestContextPayload, RequestProviderProps } from './Request.types';

export const RequestContext = createContext<RequestContextPayload>({} as RequestContextPayload);

export function RequestProvider({
  children,
  queryClient = new QueryClient(),
  config = {},
}: RequestProviderProps) {
  const providerValues = useMemo<RequestContextPayload>(() => axios.create(config), [config]);
  return (
    <RequestContext.Provider value={providerValues}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </RequestContext.Provider>
  );
}
