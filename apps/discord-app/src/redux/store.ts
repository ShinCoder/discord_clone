import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import statusReducer from './slices/statusSlice';
import authReducer from './slices/authSlice';
import { IS_DEV } from '@constants';

const loggerMiddleware = createLogger({
  // ...options
});

const getMiddlewares = () => {
  if (IS_DEV) return [loggerMiddleware];
  return [];
};

export const store = configureStore({
  reducer: {
    status: statusReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(...getMiddlewares())
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
