import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormText,
} from '@coreui/react'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { STATUS_CODE } from '../../api'
import UserService from '../../services/UserService'
import { useDispatch, useSelector } from 'react-redux'
import { activeOptions } from '../../redux/selectors'
import { MAINTAINER_VALIDATOR } from '../../validator'
import { alertReducer } from '../../redux/reducers/alertReducer'
import AlertService from '../../services/AlertService'

const Create = () => {
  const validator = MAINTAINER_VALIDATOR
  const [invalidEmail, setInvalidEmail] = useState({ invalid: false, msg: '' })
  const [invalidUsername, setInvalidUsername] = useState({ invalid: false, msg: '' })
  const [invalidPassword, setInvalidPassword] = useState({ invalid: false, msg: '' })
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const navigate = useHistory()
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    let validated = true
    if (email.length === 0) {
      setInvalidEmail({ invalid: true, msg: validator.email.required })
      validated = false
    } else setInvalidEmail({ invalid: false, msg: '' })

    if (username.length === 0) {
      setInvalidUsername({ invalid: true, msg: validator.username.required })
      validated = false
    } else setInvalidUsername({ invalid: false, msg: '' })

    if (password.length === 0) {
      setInvalidPassword({ invalid: true, msg: validator.password.required })
      validated = false
    } else setInvalidPassword({ invalid: false, msg: '' })

    if (!validated) return

    const data = {
      username: username,
      email: email,
      password: password,
      active: true,
      role: ['admin'],
    }
    UserService.create(data)
      .then((r) => {
        const data = r.data
        if (data.status === STATUS_CODE.SUCCESS) {
          dispatch(alertReducer.actions.set(AlertService.getPayload('Create Successful!')))
          navigate.push('/admins/list')
        }
      })
      .catch((res) => {
        const mess = res.response.data.message
        console.log(mess)
        if (res.response.status === STATUS_CODE.BAD_REQUEST) {
          if (mess.toLowerCase().search('email') > 0) {
            setInvalidEmail({ invalid: true, msg: validator.email['409'] })
          }
          if (mess.toLowerCase().search('username') > 0) {
            setInvalidUsername({ invalid: true, msg: validator.username['409'] })
          }
        }
      })
  }

  const handleChange = (e) => {
    const type = e.currentTarget.id
    switch (type) {
      case 'email': {
        setEmail(e.target.value)
        break
      }
      case 'username': {
        setUsername(e.target.value)
        break
      }
      case 'phone': {
        setPhone(e.target.value)
        break
      }
      case 'password': {
        setPassword(e.target.value)
        break
      }
      case 'address': {
        setAddress(e.target.value)
        break
      }
      default:
        break
    }
  }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Create new Admin</strong>
        </CCardHeader>
        <CCardBody>
          <CForm className="row g-2">
            <div className="mb-3">
              <CFormLabel htmlFor="email">
                Email <span style={{ color: 'red' }}>(*)</span>
              </CFormLabel>
              <CFormInput
                invalid={invalidEmail.invalid}
                type="email"
                id="email"
                aria-describedby="emailHelp"
                placeholder={'Enter your email...'}
                value={email}
                onChange={handleChange}
              />
              <CFormFeedback invalid>
                <strong>{invalidEmail.msg}</strong>
              </CFormFeedback>
              <CFormText id="emailHelp">We will never share your email with anyone else.</CFormText>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="username">
                Username <span style={{ color: 'red' }}>(*)</span>
              </CFormLabel>
              <CFormInput
                invalid={invalidUsername.invalid}
                type="text"
                id="username"
                aria-describedby="emailHelp"
                placeholder={'Enter your username...'}
                value={username}
                onChange={handleChange}
              />
              <CFormFeedback invalid>
                <strong>{invalidUsername.msg}</strong>
              </CFormFeedback>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="password">
                Password <span style={{ color: 'red' }}>(*)</span>
              </CFormLabel>
              <CFormInput
                invalid={invalidPassword.invalid}
                type="password"
                id="password"
                value={password}
                placeholder={'Enter your password...'}
                onChange={handleChange}
              />
              <CFormFeedback invalid>
                <strong>{invalidPassword.msg}</strong>
              </CFormFeedback>
            </div>
            <CCol xs={12}>
              <CButton type="button" onClick={handleSubmit}>
                Submit
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default Create
