import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { clearLocalStorage, readLocalStorage, writeLocalStorage } from '@utils';
import { StorageKey } from '@constants';

import { ILoginResult, AccountDto } from '@prj/types/api';

export interface AuthSlice {
  token?: {
    accessToken?: string;
    refreshToken?: string;
  };
  data?: AccountDto;
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
      writeLocalStorage(StorageKey.TOKEN, action.payload);
    },
    setAccountData: (state, action: PayloadAction<AccountDto>) => {
      state.data = action.payload;
    },
    clearAuthState: (state) => {
      clearLocalStorage(StorageKey.TOKEN);
      return {};
    }
  }
});

export const { setToken, setAccountData, clearAuthState } = authSlice.actions;

export default authSlice.reducer;
