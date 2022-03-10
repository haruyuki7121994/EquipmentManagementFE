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
import React, { useEffect, useState } from 'react'
import { STATUS_CODE } from '../../api'
import { useHistory } from 'react-router-dom'
import { activeOptions, currentCate } from '../../redux/selectors'
import { useDispatch, useSelector } from 'react-redux'
import CategoryService from '../../services/CategoryService'
import { alertReducer } from '../../redux/reducers/alertReducer'
import AlertService from '../../services/AlertService'
import { CATEGORY_VALIDATOR } from '../../validator'
import CookieService from '../../services/CookieService'
import { categoryReducer } from '../../redux/reducers/categoryReducer'

const Update = () => {
  const validator = CATEGORY_VALIDATOR
  const [name, setName] = useState('')
  const [isActive, setIsActive] = useState('inactive')
  const [invalidName, setInvalidName] = useState({ invalid: false, msg: '' })
  const [invalidActive, setInvalidActive] = useState({ invalid: false, msg: '' })
  const navigate = useHistory()
  const dispatch = useDispatch()
  const cate = useSelector(currentCate)
  const activeOpts = useSelector(activeOptions)

  useEffect(() => {
    if (Object.keys(cate).length === 0) {
      const id = CookieService.get('current_id')
      if (id === undefined) return
      CategoryService.get(id).then((res) => {
        const data = res.data
        if (data.status === STATUS_CODE.SUCCESS) {
          dispatch(
            categoryReducer.actions.find({
              data: data.data,
            }),
          )
        }
      })
    }
    if (Object.keys(cate).length > 0) {
      setName(cate.name)
      cate.isActive ? setIsActive('active') : setIsActive('inactive')
    }
  }, [cate, dispatch])

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
    CategoryService.edit(cate.id, data)
      .then((r) => {
        console.log(r)
        const data = r.data
        if (data.status === STATUS_CODE.SUCCESS) {
          dispatch(alertReducer.actions.set(AlertService.getPayload('Update Successful!')))
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
          <strong>Edit Category</strong>
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
                options={activeOpts}
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

export default Update
