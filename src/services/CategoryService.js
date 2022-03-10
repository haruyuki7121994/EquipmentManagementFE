import http from '../common/http-common'
import { API } from '../api'
const getAll = (data) => {
  return http.get(API.CATEGORY.LIST, data)
}
const get = (id) => {
  return http.get(API.CATEGORY.FIND.replace(':id', id))
}
const create = (data) => {
  return http.post(API.CATEGORY.CREATE, data)
}
const remove = (id) => {
  return http.delete(API.CATEGORY.DELETE.replace(':id', id))
}
const edit = (id, data) => {
  return http.put(API.CATEGORY.UPDATE.replace(':id', id), data)
}
const CategoryService = {
  getAll,
  get,
  remove,
  edit,
  create,
}
export default CategoryService
