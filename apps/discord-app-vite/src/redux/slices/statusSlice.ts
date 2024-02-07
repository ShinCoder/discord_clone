import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface StatusSlice {
  isLoading: boolean;
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
    }
  }
});

export const { setLoading } = statusSlice.actions;

export default statusSlice.reducer;
