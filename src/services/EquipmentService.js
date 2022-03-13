import http from '../common/http-common'
import { API } from '../api'
const getAll = (data) => {
  return http.get(API.EQUIPMENT.LIST, data)
}
const get = (id) => {
  return http.get(API.EQUIPMENT.FIND.replace(':id', id))
}
const create = (data, config) => {
  return http.post(API.EQUIPMENT.CREATE, data, config)
}
const bulkCreate = (data, config) => {
  return http.post(API.EQUIPMENT.BULK_CREATE, data, config)
}
const remove = (id) => {
  return http.delete(API.EQUIPMENT.DELETE.replace(':id', id))
}
const edit = (id, data, config) => {
  return http.put(API.EQUIPMENT.UPDATE.replace(':id', id), data)
}
const removeImage = (id) => {
  return http.delete(API.EQUIPMENT.DELETE_IMAGE.replace(':id', id))
}
const checkListQrcode = (data) => {
  return http.post(API.EQUIPMENT.CHECK_QRCODE, data)
}
const getLogs = (data) => {
  return http.get(API.EQUIPMENT.LOG, data)
}
const rollback = (id) => {
  return http.post(API.EQUIPMENT.ROLLBACK.replace(':id', id))
}
const sttLogMapping = ['Processing', 'Completed', 'Rollback']
const EquipmentService = {
  getAll,
  get,
  remove,
  edit,
  create,
  removeImage,
  bulkCreate,
  checkListQrcode,
  getLogs,
  rollback,
  sttLogMapping,
}
export default EquipmentService
