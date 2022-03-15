import { useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import AuthService from '../../../services/AuthService'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCol,
  CContainer,
  CForm,
  CFormFeedback,
  CFormFloating,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import { STATUS_CODE } from '../../../api'
import { AppAlert } from '../../../components/AppAlert'
import { alertReducer } from '../../../redux/reducers/alertReducer'
import AlertService from '../../../services/AlertService'

const Profile = () => {
  const dispatch = useDispatch()
  const [admin, setAdmin] = useState({})
  const [newPassword, setNewPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [invalidNewPassword, setInvalidNewPassword] = useState({ invalid: false, msg: '' })
  const [invalidRePassword, setInvalidRePassword] = useState({ invalid: false, msg: '' })
  const [invalidEmail, setInvalidEmail] = useState({ invalid: false, msg: '' })

  useEffect(() => {
    AuthService.profile().then((res) => {
      const data = res.data
      if (data.status === STATUS_CODE.SUCCESS) setAdmin(data.data)
      console.log(data)
    })
  }, [])

  const handleChangePassword = (e) => {
    console.log(1)
    let validated = true
    if (newPassword.length === 0) {
      console.log(1)
      setInvalidNewPassword({ invalid: true, msg: 'New Password required!' })
      validated = false
    } else setInvalidNewPassword({ invalid: false, msg: '' })

    if (rePassword.length === 0) {
      setInvalidRePassword({ invalid: true, msg: 'Re-password required!' })
      return
    } else setInvalidRePassword({ invalid: false, msg: '' })

    if (newPassword !== rePassword) {
      setInvalidRePassword({ invalid: true, msg: 'Re-password not match!' })
      validated = false
    } else setInvalidRePassword({ invalid: false, msg: '' })

    if (!validated) return

    const data = {
      password: newPassword,
      rePassword: rePassword,
    }

    AuthService.changePassword(data).then((res) => {
      const data = res.data
      if (data.status === STATUS_CODE.SUCCESS) {
        console.log(data.message)
        dispatch(alertReducer.actions.set(AlertService.getPayload(data.message)))
        setNewPassword('')
        setRePassword('')
      }
    })
  }

  const handleChangeEmail = (e) => {
    let validated = true
    if (newEmail.length === 0) {
      setInvalidEmail({ invalid: true, msg: 'New Email required!' })
      validated = false
    } else setInvalidEmail({ invalid: false, msg: '' })
    if (!validated) return

    const data = {
      email: newEmail,
    }

    AuthService.changeEmail(data)
      .then((res) => {
        const data = res.data
        if (data.status === STATUS_CODE.SUCCESS) {
          console.log(data.message)
          dispatch(alertReducer.actions.set(AlertService.getPayload(data.message)))
          const newAdmin = { ...admin }
          newAdmin.email = newEmail
          setAdmin(newAdmin)
          setNewEmail('')
        }
      })
      .catch((res) => {
        console.log(res.response)
        dispatch(alertReducer.actions.set(AlertService.getPayload(res.response.data.message)))
      })
  }

  return (
    <CContainer>
      <CRow>
        <CCol xs={3} />
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader className={'text-center'}>
              <strong>Profile</strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <AppAlert />
                <CCol md={12} className={'text-center'}>
                  <CCardText>
                    <strong>Status</strong>:{' '}
                    <CBadge color={admin.active ? 'success' : 'danger'}>
                      {admin.active ? 'Active' : 'Inactive'}
                    </CBadge>
                  </CCardText>
                  <CCardText>
                    <strong>Username</strong>: {admin.username}
                  </CCardText>
                  <CCardText>
                    <strong>Email</strong>: {admin.email}
                  </CCardText>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={3} />
      </CRow>
      <CRow>
        <CCol xs={3} />
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader className={'text-center'}>
              <strong>Change Email</strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CForm>
                  <CCol md={12} className={'text-center mb-2'}>
                    <CFormFloating>
                      <CFormInput
                        invalid={invalidEmail.invalid}
                        type="email"
                        value={newEmail}
                        id="email"
                        onChange={(e) => setNewEmail(e.currentTarget.value)}
                        placeholder="Email"
                      />
                      <CFormLabel htmlFor="exampleFormControlTextarea1">New Email</CFormLabel>
                      <CFormFeedback invalid>
                        <strong>{invalidEmail.msg}</strong>
                      </CFormFeedback>
                    </CFormFloating>
                  </CCol>
                  <CCol className={'text-center'}>
                    <CButton type={'button'} onClick={handleChangeEmail}>
                      Submit
                    </CButton>
                  </CCol>
                </CForm>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={3} />
      </CRow>
      <CRow>
        <CCol xs={3} />
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader className={'text-center'}>
              <strong>Change Password</strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CForm>
                  <CCol md={12} className={'text-center mb-2'}>
                    <CFormFloating>
                      <CFormInput
                        invalid={invalidNewPassword.invalid}
                        type="password"
                        value={newPassword}
                        id="password"
                        onChange={(e) => setNewPassword(e.currentTarget.value)}
                        placeholder="Password"
                      />
                      <CFormLabel htmlFor="exampleFormControlTextarea1">New Password</CFormLabel>
                      <CFormFeedback invalid>
                        <strong>{invalidNewPassword.msg}</strong>
                      </CFormFeedback>
                    </CFormFloating>
                  </CCol>
                  <CCol md={12} className={'text-center mb-2'}>
                    <CFormFloating>
                      <CFormInput
                        invalid={invalidRePassword.invalid}
                        type="password"
                        value={rePassword}
                        onChange={(e) => setRePassword(e.currentTarget.value)}
                        id="re-password"
                        placeholder="Re-password"
                      />
                      <CFormLabel htmlFor="exampleFormControlTextarea1">Re-password</CFormLabel>
                      <CFormFeedback invalid>
                        <strong>{invalidRePassword.msg}</strong>
                      </CFormFeedback>
                    </CFormFloating>
                  </CCol>
                  <CCol className={'text-center'}>
                    <CButton type={'button'} onClick={handleChangePassword}>
                      Submit
                    </CButton>
                  </CCol>
                </CForm>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={3} />
      </CRow>
    </CContainer>
  )
}
export default Profile
