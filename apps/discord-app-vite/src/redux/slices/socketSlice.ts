import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

export interface SocketSlice {
  socket?: Socket;
}

const initialState: SocketSlice = {
  socket: undefined
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<Socket | undefined>) => {
      return { ...state, socket: action.payload };
    }
  }
});

export const { setSocket } = socketSlice.actions;

export default socketSlice.reducer;
