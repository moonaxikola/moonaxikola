import { createContext, useMemo } from 'react';
import axios from 'axios';

import { RequestContextPayload, RequestProviderProps } from './Request.types';

export const RequestContext = createContext<RequestContextPayload>({} as RequestContextPayload);

export function RequestProvider({ children, config = {} }: RequestProviderProps) {
  const providerValues = useMemo<RequestContextPayload>(() => axios.create(config), [config]);
  return <RequestContext.Provider value={providerValues}>{children}</RequestContext.Provider>;
}
