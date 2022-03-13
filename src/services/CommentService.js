import http from '../common/http-common'
import { API } from '../api'
const getAll = (data) => {
  return http.get(API.COMMENT.LIST, data)
}
const CommentService = {
  getAll,
}
export default CommentService
