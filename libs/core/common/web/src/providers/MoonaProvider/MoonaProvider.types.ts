import { RequestProviderProps } from '@moona/core/common/data-access';

import type { ReactNode } from 'react';
import type { SettingsValueProps } from '../../contexts';

export type MoonaBaseProviderProps = {
  children: ReactNode;
  settings: SettingsValueProps;
  requestConfig?: Omit<RequestProviderProps, 'children'>;
};

export type MoonaNextProviderProps = MoonaBaseProviderProps;

export type MoonaReactProviderProps = MoonaBaseProviderProps;
