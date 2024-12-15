import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ModalSlice {
  [key: string]: {
    show: boolean;
    extraProps?: object;
  };
}

const initialState: ModalSlice = {};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (
      state,
      action: PayloadAction<{ key: string; extraProps?: object }>
    ) => {
      return {
        ...state,
        [action.payload.key]: {
          show: true,
          extraProps: action.payload.extraProps
        }
      };
    },
    hideModal: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        [action.payload]: {
          show: false
        }
      };
    }
  }
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
