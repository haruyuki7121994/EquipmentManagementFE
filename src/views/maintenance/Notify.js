import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { currentMaintenance } from '../../redux/selectors'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import MaintenanceService from '../../services/MaintenanceService'
import { STATUS_CODE } from '../../api'
import { alertReducer } from '../../redux/reducers/alertReducer'
import AlertService from '../../services/AlertService'
import CookieService from '../../services/CookieService'
import { maintenanceReducer } from '../../redux/reducers/maintenanceReducer'

const Create = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()
  const navigate = useHistory()
  const maintenance = useSelector(currentMaintenance)

  useEffect(() => {
    if (Object.keys(maintenance).length === 0) {
      const id = CookieService.get('maintenance_id')
      MaintenanceService.get(id).then((res) => {
        const data = res.data
        if (data.status === STATUS_CODE.SUCCESS) {
          dispatch(
            maintenanceReducer.actions.find({
              data: data.data,
            }),
          )
        }
      })
    }
  }, [dispatch, maintenance])

  const handleSubmit = (e) => {
    const data = {
      title: title,
      description: description,
      maintenance_id: maintenance.id,
    }
    MaintenanceService.createNotification(data).then((res) => {
      const data = res.data
      if (data.status === STATUS_CODE.SUCCESS) {
        dispatch(alertReducer.actions.set(AlertService.getPayload('Send Notification Successful!')))
        navigate.push('/maintenance/list')
      }
    })
  }
  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Notify</strong>
        </CCardHeader>
        <CCardBody>
          <CForm className="row g-2">
            <CRow>
              <CCol md={6} className="mb-3">
                <CFormLabel htmlFor="is_active">
                  Maintainer <span style={{ color: 'red' }}>(*)</span>
                </CFormLabel>
                <CFormInput
                  disabled={true}
                  type={'text'}
                  value={maintenance.user !== undefined ? maintenance.user.username : ''}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12} className="mb-3">
                <CFormLabel htmlFor="is_active">
                  Title <span style={{ color: 'red' }}>(*)</span>
                </CFormLabel>
                <CFormInput
                  id={'title'}
                  value={title}
                  type={'text'}
                  placeholder={'Please input title...'}
                  onChange={(e) => setTitle(e.currentTarget.value)}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12} className="mb-3">
                <CFormLabel htmlFor="is_active">
                  Description <span style={{ color: 'red' }}>(*)</span>
                </CFormLabel>
                <CKEditor
                  id={'description'}
                  editor={ClassicEditor}
                  data={description}
                  onChange={(event, editor) => {
                    const data = editor.getData()
                    setDescription(data)
                  }}
                />
              </CCol>
            </CRow>
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
