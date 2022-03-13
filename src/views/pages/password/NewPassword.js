import React, { useState } from 'react'
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
import { cilUser } from '@coreui/icons'
import AuthService from '../../../services/AuthService'
import CookieService from '../../../services/CookieService'
import { useHistory } from 'react-router-dom'
import { AppAlert } from '../../../components/AppAlert'
import { alertReducer } from '../../../redux/reducers/alertReducer'
import AlertService from '../../../services/AlertService'
import { useDispatch } from 'react-redux'

const NewPassword = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const email = CookieService.get('email_forgot')
  console.log(email)
  if (email === undefined) {
    history.push('/login')
  }
  const [code, setCode] = useState('')
  const [invalidCode, setInvalidCode] = useState({ invalid: false, msg: '' })

  const [password, setPassword] = useState('')
  const [invalidPassword, setInvalidPassword] = useState({ invalid: false, msg: '' })

  const [rePassword, setRePassword] = useState('')
  const [invalidRePassword, setInvalidRePassword] = useState({ invalid: false, msg: '' })

  const handleSubmit = (e) => {
    let validated = true
    if (code.length === 0) {
      setInvalidCode({ invalid: true, msg: 'Code is required!' })
      validated = false
    } else setInvalidCode({ invalid: false, msg: '' })

    if (password.length === 0) {
      setInvalidPassword({ invalid: true, msg: 'Password is required!' })
      validated = false
    } else setInvalidPassword({ invalid: false, msg: '' })

    if (rePassword.length === 0) {
      setInvalidRePassword({ invalid: true, msg: 'Re-password is required!' })
      return
    } else setInvalidRePassword({ invalid: false, msg: '' })

    if (rePassword !== password) {
      setInvalidRePassword({ invalid: true, msg: 'Re-password not match!' })
      validated = false
    } else setInvalidRePassword({ invalid: false, msg: '' })

    if (!validated) return

    const data = {
      email: email,
      code: code,
      newPassword: password,
      rePassword: rePassword,
    }
    AuthService.verifyForgotPassword(data)
      .then((res) => {
        CookieService.remove('email_forgot')
        history.push('/login')
      })
      .catch((res) => {
        const data = res.response
        const msg = data.data.message
        dispatch(alertReducer.actions.set(AlertService.getPayload(msg)))
      })
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
                    <h1>Reset Password</h1>
                    <p className="text-medium-emphasis">Send email for reset password</p>
                    <AppAlert />
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        invalid={invalidCode.invalid}
                        value={code}
                        onChange={(e) => setCode(e.currentTarget.value)}
                        placeholder="Code"
                        autoComplete="Code"
                      />
                      <CFormFeedback invalid>
                        <strong>{invalidCode.msg}</strong>
                      </CFormFeedback>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        invalid={invalidPassword.invalid}
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        placeholder="Password"
                        autoComplete="password"
                      />
                      <CFormFeedback invalid>
                        <strong>{invalidPassword.msg}</strong>
                      </CFormFeedback>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        invalid={invalidRePassword.invalid}
                        value={rePassword}
                        onChange={(e) => setRePassword(e.currentTarget.value)}
                        placeholder="Re-password"
                        autoComplete="Re-password"
                      />
                      <CFormFeedback invalid>
                        <strong>{invalidRePassword.msg}</strong>
                      </CFormFeedback>
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton onClick={handleSubmit} color="primary" className="px-4">
                          Send
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

export default NewPassword
