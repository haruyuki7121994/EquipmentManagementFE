import http from '../common/http-common'
import { API } from '../api'
const login = (data) => {
  return http.post(API.AUTH.LOGIN, data)
}
const profile = () => {
  return http.get(API.AUTH.PROFILE)
}
const changePassword = (data) => {
  return http.post(API.AUTH.CHANGE_PASSWORD, data)
}
const sendForgotPassword = (data) => {
  return http.post(API.AUTH.SEND_FORGOT_PASSWORD, data)
}
const verifyForgotPassword = (data) => {
  return http.post(API.AUTH.VERIFY_FORGOT_PASSWORD, data)
}
const AuthService = {
  login,
  profile,
  changePassword,
  sendForgotPassword,
  verifyForgotPassword,
}
export default AuthService
