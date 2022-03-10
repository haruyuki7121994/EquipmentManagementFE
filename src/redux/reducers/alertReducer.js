import { createSlice } from '@reduxjs/toolkit'

export const alertReducer = createSlice({
  name: 'alert',
  initialState: {
    visible: false,
    color: 'success',
    message: '',
    id: 0,
  },
  reducers: {
    set: (state, action) => {
      state.visible = action.payload.visible
      state.color = action.payload.color
      state.message = action.payload.message
      state.id = action.payload.id
    },
  },
})
