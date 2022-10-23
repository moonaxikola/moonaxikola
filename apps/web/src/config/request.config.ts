import { MoonaNextProviderProps } from '@moona/common/web';

export const requestConfig: MoonaNextProviderProps['requestConfig'] = {
  config: {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
  },
};
