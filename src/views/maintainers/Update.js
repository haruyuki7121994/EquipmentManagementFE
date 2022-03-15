import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormText,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { STATUS_CODE } from '../../api'
import UserService from '../../services/UserService'
import { useDispatch, useSelector } from 'react-redux'
import { activeOptions, currentMaintainer } from '../../redux/selectors'
import { maintainerReducer } from '../../redux/reducers/maintainerReducer'
import CookieService from '../../services/CookieService'

const Update = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [id, setId] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [isActive, setIsActive] = useState('inactive')
  const navigate = useHistory()
  const dispatch = useDispatch()
  const activeOpts = useSelector(activeOptions)
  const maintainer = useSelector(currentMaintainer)
  useEffect(() => {
    if (Object.keys(maintainer).length === 0) {
      const id = CookieService.get('maintainer_id')
      UserService.get(id).then((res) => {
        const data = res.data
        if (data.status === STATUS_CODE.SUCCESS) {
          dispatch(
            maintainerReducer.actions.find({
              data: data.data,
            }),
          )
        }
      })
    }
    if (Object.keys(maintainer).length > 0) {
      setUsername(maintainer.username)
      setEmail(maintainer.email)
      setAddress(maintainer.address)
      setPhone(maintainer.phone)
      setId(maintainer.id)
      maintainer._active ? setIsActive('active') : setIsActive('inactive')
    }
  }, [dispatch, maintainer])
  const handleSubmit = (e) => {
    const data = {
      phone: phone,
      address: address,
      active: isActive === 'active',
    }
    UserService.edit(id, data).then((r) => {
      const data = r.data
      if (data.status === STATUS_CODE.SUCCESS) {
        navigate.push('/maintainers/list')
      }
    })
  }

  const handleChange = (e) => {
    const type = e.currentTarget.id
    switch (type) {
      case 'active': {
        e.target.value === 'active' ? setIsActive('active') : setIsActive('inactive')
        break
      }
      case 'phone': {
        setPhone(e.target.value)
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
          <strong>Update Maintainer</strong>
        </CCardHeader>
        <CCardBody>
          <CForm className="row g-2">
            <div className="mb-3">
              <CFormLabel htmlFor="email">
                Email <span style={{ color: 'red' }}>(*)</span>
              </CFormLabel>
              <CFormInput
                type="email"
                id="email"
                aria-describedby="emailHelp"
                placeholder={'Enter your email...'}
                value={email}
                readOnly={true}
              />
              <CFormText id="emailHelp">We will never share your email with anyone else.</CFormText>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="username">
                Username <span style={{ color: 'red' }}>(*)</span>
              </CFormLabel>
              <CFormInput
                type="text"
                id="username"
                aria-describedby="emailHelp"
                placeholder={'Enter your username...'}
                value={username}
                readOnly={true}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="phone">Phone Number</CFormLabel>
              <CFormInput
                type="text"
                id="phone"
                value={phone}
                placeholder={'Enter your phone number...'}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="address">Address</CFormLabel>
              <CFormInput
                type="text"
                value={address}
                id="address"
                placeholder={'Enter your address...'}
                onChange={handleChange}
              />
            </div>
            <CCol md={6} className="mb-3">
              <CFormLabel htmlFor="active">
                Active <span style={{ color: 'red' }}>(*)</span>
              </CFormLabel>
              <CFormSelect
                id={'active'}
                aria-label="Default select example"
                options={activeOpts}
                value={isActive}
                onChange={handleChange}
              />
            </CCol>
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

export default Update
