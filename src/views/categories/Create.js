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
} from '@coreui/react'
import React, { useState } from 'react'
import { STATUS_CODE } from '../../api'
import { useHistory } from 'react-router-dom'
import CategoryService from '../../services/CategoryService'
import { alertReducer } from '../../redux/reducers/alertReducer'
import { useDispatch } from 'react-redux'
import AlertService from '../../services/AlertService'
import { CATEGORY_VALIDATOR } from '../../validator'

const Create = () => {
  const validator = CATEGORY_VALIDATOR
  const [name, setName] = useState('')
  const [isActive, setIsActive] = useState('inactive')
  const [invalidName, setInvalidName] = useState({ invalid: false, msg: '' })
  const [invalidActive, setInvalidActive] = useState({ invalid: false, msg: '' })
  const navigate = useHistory()
  const dispatch = useDispatch()
  const handleChangeName = (e) => {
    setName(e.target.value)
  }
  const handleChangeActive = (e) => {
    e.target.value === 'active' ? setIsActive('active') : setIsActive('inactive')
  }
  const handleSubmit = (e) => {
    if (name.length === 0) {
      setInvalidName({ invalid: true, msg: validator.name.required })
      return
    }

    if (isActive.length === 0) {
      setInvalidActive({ invalid: true, msg: validator.active.required })
      return
    }

    const data = {
      name: name,
      active: isActive === 'active',
    }
    CategoryService.create(data)
      .then((r) => {
        const data = r.data
        if (data.status === STATUS_CODE.SUCCESS) {
          dispatch(alertReducer.actions.set(AlertService.getPayload('Create Successful!')))
          navigate.push('/categories/list')
        }
      })
      .catch((reason) => {
        if (reason.response.status === STATUS_CODE.CONFLICT) {
          setInvalidName({ invalid: true, msg: validator.name['409'] })
        }
      })
  }
  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Create new Category</strong>
        </CCardHeader>
        <CCardBody>
          <CForm className="row g-2">
            <div className="mb-3">
              <CFormLabel htmlFor="name">
                Name <span style={{ color: 'red' }}>(*)</span>
              </CFormLabel>
              <CFormInput
                invalid={invalidName.invalid}
                type="text"
                id="name"
                placeholder={'Please input name...'}
                value={name}
                onChange={handleChangeName}
              />
              <CFormFeedback invalid>
                <strong>{invalidName.msg}</strong>
              </CFormFeedback>
            </div>
            <CCol md={6} className="mb-3">
              <CFormLabel htmlFor="is_active">
                Active <span style={{ color: 'red' }}>(*)</span>
              </CFormLabel>
              <CFormSelect
                invalid={invalidActive.invalid}
                aria-label="Default select example"
                options={[
                  { label: 'Active', value: 'active' },
                  { label: 'Inactive', value: 'inactive' },
                ]}
                value={isActive}
                onChange={handleChangeActive}
              />
            </CCol>
            <CCol xs={12}>
              <CButton onClick={handleSubmit}>Submit</CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default Create
