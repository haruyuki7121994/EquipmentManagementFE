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

const Reset = () => {
  const [email, setEmail] = useState('')
  const [invalidEmail, setInvalidEmail] = useState({ invalid: false, msg: '' })
  const history = useHistory()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    let validated = true
    if (email.length === 0) {
      setInvalidEmail({ invalid: true, msg: 'Email is required!' })
      validated = false
    } else setInvalidEmail({ invalid: false, msg: '' })

    if (!validated) return

    const data = {
      email: email,
    }
    AuthService.sendForgotPassword(data)
      .then((res) => {
        const data = res.data
        console.log(data)
        CookieService.save('email_forgot', email)
        history.push('/verify')
      })
      .catch((res) => {
        const data = res.response
        console.log(data)
        dispatch(
          alertReducer.actions.set(
            AlertService.getPayload('Failed! Email is not existed in system!'),
          ),
        )
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
                        invalid={invalidEmail.invalid}
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        placeholder="Email"
                        autoComplete="username"
                      />
                      <CFormFeedback invalid>
                        <strong>{invalidEmail.msg}</strong>
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

export default Reset
