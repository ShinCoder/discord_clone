import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import statusReducer from './slices/statusSlice';
import authReducer from './slices/authSlice';
import socketReducer from './slices/socketSlice';
import modalReducer from './slices/modalSlice';
import rootSaga from './saga';
import { IS_DEV } from '@constants';

const sagaMiddleware = createSagaMiddleware();

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
    auth: authReducer,
    socket: socketReducer,
    modal: modalReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['socket/setSocket'],
        ignoredPaths: ['socket.socket']
      }
    })
      .concat(...getMiddlewares())
      .concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
