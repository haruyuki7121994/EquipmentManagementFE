import { createSlice } from '@reduxjs/toolkit'

export const authReducer = createSlice({
  name: 'auth',
  initialState: {
    data: {
      token:
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjEiLCJpYXQiOjE2NDY4MTgzMDAsImV4cCI6MTY0NjkwNDcwMH0.iPAoT75PfGMLZ_aFLhfFpMppGk6JCAedC4ok3RcEM6A8MNOB1aJbtOGaaIkRytgCAPnKU4wH4j8fpsj30jonyg',
    },
    isLogin: false,
    isLogout: false,
  },
  reducers: {
    setAuth: (state, action) => {
      state.isLogin = action.payload.isLogin
      state.data = action.payload.data
    },
    setLogout: (state, action) => {
      state.isLogout = action.payload.isLogout
    },
  },
})
