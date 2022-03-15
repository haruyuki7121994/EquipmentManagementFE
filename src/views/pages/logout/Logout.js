import CookieService from '../../../services/CookieService'
import { useHistory } from 'react-router-dom'

const Logout = () => {
  const history = useHistory()
  if (CookieService.get('access_token') === undefined) {
    history.push('/login')
  }
  const handleLogout = () => {
    CookieService.remove('access_token')
    console.log('logout')
    document.location.reload()
  }
  handleLogout()
  return null
}
export default Logout
