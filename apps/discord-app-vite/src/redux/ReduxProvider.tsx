'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { injectStore } from '@services';
import { store } from './store';

interface ReduxProviderProps {
  children: ReactNode;
}

const ReduxProvider = (props: ReduxProviderProps) => {
  const { children } = props;

  injectStore(store);

  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
