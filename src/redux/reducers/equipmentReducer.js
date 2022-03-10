import { createSlice } from '@reduxjs/toolkit'

export const equipmentReducer = createSlice({
  name: 'equipment',
  initialState: {
    currentEquipment: {},
    list: [],
    metadata: {},
    exportData: {
      qrcodeSize: 's',
      totalItems: [],
      totalPages: 0,
    },
  },
  reducers: {
    getList: (state, action) => {
      state.list = action.payload.equipments
      state.metadata = action.payload.metadata
    },
    find: (state, action) => {
      state.currentEquipment = action.payload.data
    },
    export: (state, action) => {
      state.exportData.qrcodeSize = action.payload.qrcodeSize
      state.exportData.totalItems = action.payload.totalItems
      state.exportData.totalPages = action.payload.totalPages
    },
  },
})
