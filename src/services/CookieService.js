const save = (key, value) => {
  document.cookie = `${key}=${value}`
  return true
}
const get = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}
const remove = (name) => {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}
const CookieService = {
  save,
  get,
  remove,
}
export default CookieService
