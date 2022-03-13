import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import '@coreui/coreui/dist/css/coreui.min.css'
import { MAINTENANCE_VALIDATOR } from '../../validator'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { STATUS_CODE } from '../../api'
import UserService from '../../services/UserService'
import { AppSpinner } from '../../components/AppSpinner'
import MaintenanceService from '../../services/MaintenanceService'
import { alertReducer } from '../../redux/reducers/alertReducer'
import AlertService from '../../services/AlertService'
import { currentMaintenance } from '../../redux/selectors'
import CookieService from '../../services/CookieService'
import { maintenanceReducer } from '../../redux/reducers/maintenanceReducer'

const Update = () => {
  const typeOptions = MaintenanceService.typeOptions
  const validator = MAINTENANCE_VALIDATOR
  const [invalidDate, setInvalidDate] = useState({ invalid: false, msg: '' })
  const [invalidMaintainer, setInvalidMaintainer] = useState({ invalid: false, msg: '' })
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState('')
  const [status, setStatus] = useState(0)
  const [maintainer, setMaintainer] = useState('')
  const [repeatable, setRepeatable] = useState(false)
  const [repeatedType, setRepeatedType] = useState('0')
  const [maintainerOpts, setMaintainerOpts] = useState([])
  const [show, setShow] = useState(false)
  const navigate = useHistory()
  const dispatch = useDispatch()
  const maintenance = useSelector(currentMaintenance)

  useEffect(() => {
    let maintainerOptions = [{ label: 'Select Maintainer', value: '' }]
    let data = {
      params: {
        page: 0,
        size: 500,
        role: 'maintainer',
      },
    }
    UserService.getAll(data).then((res) => {
      const data = res.data
      console.log(data)
      if (data.status === STATUS_CODE.SUCCESS) {
        res.data.data.users.forEach((e) => {
          if (e._active) maintainerOptions.push({ label: e.username, value: e.id })
        })
        setMaintainerOpts(maintainerOptions)
        setLoading(false)
      }
    })
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
    if (Object.keys(maintenance).length > 0) {
      setDate(maintenance.dateMaintenance)
      setMaintainer(maintenance.user.id)
      setRepeatable(maintenance.repeatable)
      if (maintenance.repeatable) setShow(true)
      setRepeatedType(maintenance.repeatedType)
      setStatus(maintenance.status)
    }
  }, [dispatch, maintenance])

  function convertTZ(date, tzString) {
    const objectDate = new Date(
      (typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', {
        timeZone: tzString,
      }),
    )
    const year = objectDate.getFullYear()
    const month =
      objectDate.getMonth() + 1 >= 10 ? objectDate.getMonth() + 1 : `0${objectDate.getMonth() + 1}`
    const day = objectDate.getDate() >= 10 ? objectDate.getDate() : `0${objectDate.getDate()}`
    return `${year}-${month}-${day}`
  }

  const currentDate = convertTZ(new Date(), 'Asia/Ho_Chi_Minh')

  const handleChange = (e) => {
    const type = e.currentTarget.id
    switch (type) {
      case 'maintainer':
        setMaintainer(e.currentTarget.value)
        break
      case 'date':
        setDate(e.currentTarget.value)
        break
      case 'repeated-type':
        setRepeatedType(e.currentTarget.value)
        break
      default:
        break
    }
  }

  const handleSubmit = (e) => {
    let validated = true
    if (date.length === 0) {
      setInvalidDate({ invalid: true, msg: validator.date.required })
      validated = false
    } else setInvalidDate({ invalid: false, msg: '' })

    if (maintainer.length === 0) {
      setInvalidMaintainer({ invalid: true, msg: validator.maintainer.required })
      validated = false
    } else setInvalidMaintainer({ invalid: false, msg: '' })

    if (!validated) return

    const data = {
      dateMaintenance: date,
      statue: status,
      repeatable: repeatable,
      repeatedType: repeatedType,
      maintainer: maintainer,
    }

    MaintenanceService.edit(e.currentTarget.id, data).then((res) => {
      const data = res.data
      if (data.status === STATUS_CODE.SUCCESS) {
        dispatch(alertReducer.actions.set(AlertService.getPayload('Update Successful!')))
        navigate.push('/maintenance/list')
      }
    })
  }
  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Create new Maintenance</strong>
        </CCardHeader>
        <CCardBody>
          <CForm className="row g-2">
            <CRow>
              <CCol md={6} className="mb-3">
                <CFormLabel htmlFor="name">
                  Maintenance Date <span style={{ color: 'red' }}>(*)</span>
                </CFormLabel>
                <CFormInput
                  invalid={invalidDate.invalid}
                  id={'date'}
                  type={'date'}
                  pattern="\d{4}-\d{2}-\d{2}"
                  onChange={handleChange}
                  value={date}
                  min={currentDate}
                />
                <CFormFeedback invalid>
                  <strong>{invalidDate.msg}</strong>
                </CFormFeedback>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6} className="mb-3">
                <CFormLabel htmlFor="is_active">
                  Maintainer <span style={{ color: 'red' }}>(*)</span>
                </CFormLabel>
                {loading ? (
                  <AppSpinner />
                ) : (
                  <>
                    <CFormSelect
                      invalid={invalidMaintainer.invalid}
                      id={'maintainer'}
                      aria-label="Default select example"
                      options={maintainerOpts}
                      value={maintainer}
                      onChange={handleChange}
                    />
                    <CFormFeedback invalid>
                      <strong>{invalidMaintainer.msg}</strong>
                    </CFormFeedback>
                  </>
                )}
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6} className="mb-3">
                <CFormLabel htmlFor="is_active">Repeat Type</CFormLabel>
                <CFormCheck
                  checked={repeatable === false}
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  label="None"
                  onChange={() => {
                    setRepeatable(false)
                    setShow(false)
                  }}
                  defaultChecked
                />
                <CFormCheck
                  checked={repeatable === true}
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadio2"
                  label="Repeatable Maintenance"
                  onChange={() => {
                    setRepeatable(true)
                    setShow(true)
                  }}
                />
                <CFormSelect
                  className={'mt-2'}
                  hidden={!show}
                  id={'repeated-type'}
                  aria-label="Default select example"
                  options={typeOptions}
                  value={repeatedType}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
            <CCol xs={12}>
              <CButton id={maintenance.id} onClick={handleSubmit}>
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
