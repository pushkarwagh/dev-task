import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  visible: false,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setVisibility: (state, action) => {
      state.visible = action.payload;
    },
  },
})

export const { setVisibility } = modalSlice.actions

export default modalSlice.reducer