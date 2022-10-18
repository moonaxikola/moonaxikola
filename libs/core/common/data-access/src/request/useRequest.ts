import { useContext } from 'react';

import { RequestContext } from './Request.provider';

export function useRequest() {
  const context = useContext(RequestContext);

  if (!context) throw new Error('useRequest must be use inside a RequestProvider');

  return context;
}
