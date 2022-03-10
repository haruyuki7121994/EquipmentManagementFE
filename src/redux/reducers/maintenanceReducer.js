import { createSlice } from '@reduxjs/toolkit'

export const maintenanceReducer = createSlice({
  name: 'maintenance',
  initialState: {
    currentMaintenance: {},
    list: [],
    metadata: {},
  },
  reducers: {
    getList: (state, action) => {
      state.list = action.payload.maintenances
      state.metadata = action.payload.metadata
    },
    find: (state, action) => {
      state.currentMaintenance = action.payload.data
    },
  },
})
