import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormFeedback,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { loginReducer } from '../../../redux/reducers/loginReducer'
import axios from 'axios'
import { API, HOST, STATUS_CODE } from '../../../api'
import { AppAlert } from '../../../components/AppAlert'
import { alertReducer } from '../../../redux/reducers/alertReducer'
import AlertService from '../../../services/AlertService'

const Login = () => {
  const [invalidUsername, setInvalidUsername] = useState({ invalid: false, msg: '' })
  const [invalidPassword, setInvalidPassword] = useState({ invalid: false, msg: '' })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useHistory()

  const handleClick = () => {
    let validated = true
    if (username.length === 0) {
      setInvalidUsername({ invalid: true, msg: 'Username required!' })
      validated = false
    } else setInvalidUsername({ invalid: false, msg: '' })

    if (password.length === 0) {
      setInvalidPassword({ invalid: true, msg: 'Password required!' })
      validated = false
    } else setInvalidPassword({ invalid: false, msg: '' })

    if (!validated) return

    axios
      .post(HOST + API.LOGIN, {
        username: username,
        password: password,
      })
      .then((r) => {
        const data = r.data
        if (data.status === STATUS_CODE.SUCCESS) {
          document.cookie = `access_token=${data.data.token}`
          dispatch(
            loginReducer.actions.setAuth({
              isLogin: true,
              data: data.data,
            }),
          )
          navigate.push('/dashboard')
        }
      })
      .catch((res) => {
        if (res.response.status === STATUS_CODE.UNAUTHORIZED) {
          dispatch(alertReducer.actions.set(AlertService.getPayload('Login failed!')))
          console.log('fail')
        }
      })
  }
  const handleChangeUsername = (e) => {
    setUsername(e.target.value)
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6} xl={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <AppAlert />
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        invalid={invalidUsername.invalid}
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={handleChangeUsername}
                      />
                    </CInputGroup>
                    <CFormFeedback invalid>
                      <strong>{invalidUsername.msg}</strong>
                    </CFormFeedback>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        invalid={invalidPassword.invalid}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={handleChangePassword}
                      />
                    </CInputGroup>
                    <CFormFeedback invalid>
                      <strong>{invalidPassword.msg}</strong>
                    </CFormFeedback>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleClick}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
