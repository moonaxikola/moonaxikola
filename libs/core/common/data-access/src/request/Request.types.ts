import { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { ReactNode } from 'react';

export type RequestContextPayload = AxiosInstance;

export type RequestProviderProps = {
  children: ReactNode;
  config?: CreateAxiosDefaults;
};
