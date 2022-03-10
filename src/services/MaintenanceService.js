import http from '../common/http-common'
import { API } from '../api'
const getAll = (data) => {
  return http.get(API.MAINTENANCE.LIST, data)
}
const get = (id) => {
  return http.get(API.MAINTENANCE.FIND.replace(':id', id))
}
const create = (data) => {
  return http.post(API.MAINTENANCE.CREATE, data)
}
const addEquipments = (data, id) => {
  return http.post(API.MAINTENANCE.ADD_EQUIPMENTS.replace(':id', id), data)
}
const removeEquipments = (data, id) => {
  return http.post(API.MAINTENANCE.REMOVE_EQUIPMENTS.replace(':id', id), data)
}
const remove = (id) => {
  return http.delete(API.MAINTENANCE.DELETE.replace(':id', id))
}
const edit = (id, data) => {
  return http.put(API.MAINTENANCE.UPDATE.replace(':id', id), data)
}
const createNotification = (data) => {
  return http.post(API.MAINTENANCE.NOTIFICATION, data)
}
const typeOptions = [
  { label: 'Every Week', value: '0' },
  { label: 'Every Month', value: '1' },
  { label: 'Every Quarter', value: '2' },
  { label: 'Every Year', value: '3' },
]
const sttMapping = ['Pending', 'Processing', 'Ended']
const MaintenanceService = {
  getAll,
  get,
  remove,
  edit,
  create,
  addEquipments,
  removeEquipments,
  createNotification,
  typeOptions,
  sttMapping,
}
export default MaintenanceService
