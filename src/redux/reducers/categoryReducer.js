import { createSlice } from '@reduxjs/toolkit'

export const categoryReducer = createSlice({
  name: 'category',
  initialState: {
    currentCate: {},
    list: [],
    metadata: {},
  },
  reducers: {
    getList: (state, action) => {
      state.list = action.payload.categories
      state.metadata = action.payload.metadata
    },
    find: (state, action) => {
      state.currentCate = action.payload.data
    },
  },
})
