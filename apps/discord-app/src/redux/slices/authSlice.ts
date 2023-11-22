import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ILoginResult, IGetMeResult } from '@prj/types/api';

interface AuthSlice {
  token?: ILoginResult;
  data?: IGetMeResult;
}

const initialState: AuthSlice = {};

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
