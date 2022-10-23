import { MoonaNextProviderProps } from '@moona/common/web';

export const requestConfig: MoonaNextProviderProps['requestConfig'] = {
  config: {
    baseURL: 'http://localhost:3000',
    withCredentials: true,
  },
};
