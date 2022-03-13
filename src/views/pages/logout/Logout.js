import { useDispatch, useSelector } from 'react-redux'
import { authReducer } from '../../../redux/reducers/authReducer'
import CookieService from '../../../services/CookieService'
import { useHistory } from 'react-router-dom'

const Logout = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const alertVisible = useSelector((state) => state.alert.visible)
  const handleLogout = () => {
    dispatch(
      authReducer.actions.setAuth({
        isLogin: false,
        data: { token: '' },
      }),
    )
    CookieService.remove('access_token')
    console.log('logout')
    history.push('/login')
  }
  if (alertVisible) {
    setTimeout(() => {
      handleLogout()
    }, 3000)
  } else {
    handleLogout()
  }
  return null
}
export default Logout
