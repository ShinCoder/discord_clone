import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface StatusSlice {
  isLoading: boolean;
  error?: string;
}

const initialState: StatusSlice = {
  isLoading: false
};

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      if (action.payload) {
        state.error = action.payload;
      } else state.error = undefined;
    }
  }
});

export const { setLoading, setErrorMessage } = statusSlice.actions;

export default statusSlice.reducer;
