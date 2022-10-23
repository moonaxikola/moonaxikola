import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement } from 'react';

import { SettingsValueProps } from '../contexts/SettingsContext/SettingsContext.types';

export type MoonaNextPage = NextPage & {
  getLayout?: (page: ReactElement) => React.ReactElement;
};

export interface MoonaNextAppProps extends AppProps {
  settings: SettingsValueProps;
  Component: MoonaNextPage;
}
