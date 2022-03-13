import http from '../common/http-common'
import { API } from '../api'
const getAll = () => {
  return http.get(API.REPORT.LIST)
}
const DashboardService = {
  getAll,
}
export default DashboardService
