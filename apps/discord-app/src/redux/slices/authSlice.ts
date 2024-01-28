import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { readLocalStorage } from '@utils';

import { ILoginResult, IGetMeResult } from '@prj/types/api';
import { StorageKey } from '@constants';

export interface AuthSlice {
  token?: {
    accessToken?: string;
    refreshToken?: string;
  };
  data?: IGetMeResult;
}

const initialState: AuthSlice = {
  token: readLocalStorage(StorageKey.TOKEN, undefined)
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<ILoginResult>) => {
      state.token = action.payload;
    },
    setAccountData: (state, action: PayloadAction<IGetMeResult>) => {
      state.data = action.payload;
    },
    clearAuthState: (state) => {
      state = {};
    }
  }
});

export const { setToken, setAccountData, clearAuthState } = authSlice.actions;

export default authSlice.reducer;
