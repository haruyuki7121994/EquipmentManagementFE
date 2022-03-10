const save = (key, value) => {
  document.cookie = `${key}=${value}`
  return true
}
const get = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}
const CookieService = {
  save,
  get,
}
export default CookieService
