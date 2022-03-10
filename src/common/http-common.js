import axios from 'axios'
import { HOST } from '../api'
import store from '../store'
const instance = axios.create({
  baseURL: HOST,
  headers: {
    'Content-type': 'application/json',
  },
})
instance.interceptors.request.use((request) => {
  if (store.getState().auth.isLogin) {
    const token = store.getState().auth.data.token
    request.headers.common.Authorization = `Bearer ${token}`
  }
  return request
})
export default instance
