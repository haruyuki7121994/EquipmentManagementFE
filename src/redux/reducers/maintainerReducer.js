import { createSlice } from '@reduxjs/toolkit'

export const maintainerReducer = createSlice({
  name: 'maintainer',
  initialState: {
    currentMaintainer: {},
    list: [],
    metadata: {},
  },
  reducers: {
    getList: (state, action) => {
      state.list = action.payload.maintenances
      state.metadata = action.payload.metadata
    },
    find: (state, action) => {
      state.currentMaintainer = action.payload.data
    },
  },
})
