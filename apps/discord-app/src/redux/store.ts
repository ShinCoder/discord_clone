import { configureStore } from '@reduxjs/toolkit';

import statusReducer from './slices/statusSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    status: statusReducer,
    auth: authReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
