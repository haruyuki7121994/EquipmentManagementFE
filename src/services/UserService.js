import http from '../common/http-common'
import { API } from '../api'
const getAll = (data) => {
  return http.get(API.USER.LIST, data)
}
const get = (id) => {
  return http.get(API.USER.FIND.replace(':id', id))
}
const create = (data) => {
  return http.post(API.USER.CREATE, data)
}
const remove = (id) => {
  return http.delete(API.USER.DELETE.replace(':id', id))
}
const edit = (id, data) => {
  return http.put(API.USER.UPDATE.replace(':id', id), data)
}
const UserService = {
  getAll,
  get,
  remove,
  edit,
  create,
}
export default UserService
