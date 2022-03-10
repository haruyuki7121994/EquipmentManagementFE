import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { cilDescription, cilBellExclamation, cilPencil, cilPlus, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { STATUS_CODE } from '../../api'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import MaintenanceService from '../../services/MaintenanceService'
import { maintenanceReducer } from '../../redux/reducers/maintenanceReducer'
import store from '../../store'
import { AppPagination } from '../../components/AppPagination'
import { AppAlert } from '../../components/AppAlert'
import CookieService from '../../services/CookieService'

const List = () => {
  const [maintenances, setMaintenances] = useState([])
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [orderBy, setOrderBy] = useState('id-desc')
  const [popup, setPopup] = useState({ show: false, id: null })
  const dispatch = useDispatch()
  const navigate = useHistory()

  const filterOpts = [
    { label: 'Id Descending', value: 'id-desc' },
    { label: 'Id Ascending', value: 'id-asc' },
    { label: 'Date Descending', value: 'dateMaintenance-desc' },
    { label: 'Date Ascending', value: 'dateMaintenance-asc' },
  ]

  const sttMapping = MaintenanceService.sttMapping

  const typeMapping = ['Every Week', 'Every Month', 'Every Quarter', 'Every Year']

  useEffect(() => {
    const data = {
      params: {
        page: page,
        size: size,
        orderBy: orderBy,
        startDate: startDate,
        endDate: endDate,
      },
    }
    MaintenanceService.getAll(data).then((res) => {
      const data = res.data
      console.log(data)
      if (data.status === STATUS_CODE.SUCCESS) {
        dispatch(
          maintenanceReducer.actions.getList({
            maintenances: data.data.maintenances,
            metadata: data.metadata,
          }),
        )
        setMaintenances(res.data.data.maintenances)
      }
    })
  }, [dispatch, orderBy, page, size, startDate, endDate])

  const handleChange = (e) => {
    setOrderBy(e.currentTarget.value)
  }

  const handleClickAddBtn = (e) => {
    saveId(e.currentTarget.id)
    findMaintenance(e.currentTarget.id, '/maintenance/add')
  }

  const handleClickDetailBtn = (e) => {
    saveId(e.currentTarget.id)
    findMaintenance(e.currentTarget.id, '/maintenance/detail')
  }

  const handleClickNotificationBtn = (e) => {
    saveId(e.currentTarget.id)
    findMaintenance(e.currentTarget.id, '/maintenance/notify')
  }

  const findMaintenance = (id, redirectUrl) => {
    MaintenanceService.get(id).then((res) => {
      const data = res.data
      if (data.status === STATUS_CODE.SUCCESS) {
        dispatch(
          maintenanceReducer.actions.find({
            data: data.data,
          }),
        )
        navigate.push(redirectUrl)
      }
    })
  }

  const saveId = (id) => {
    CookieService.save('maintenance_id', id)
  }

  const handleRangeDate = (e) => {
    const type = e.currentTarget.id
    if (type === 'start-date') {
      if (e.currentTarget.value > endDate) setEndDate('')
      setStartDate(e.currentTarget.value)
    }
    if (type === 'end-date') {
      if (e.currentTarget.value < startDate) setEndDate('')
      else setEndDate(e.currentTarget.value)
    }
  }

  return (
    // Table
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>List Maintenance</strong>
        </CCardHeader>
        <CCardBody>
          <AppAlert />
          <CRow>
            <CCol xs={12} sm={2}>
              <CFormInput
                id={'start-date'}
                type={'date'}
                value={startDate}
                onChange={handleRangeDate}
              />
            </CCol>
            <CCol xs={12} sm={2}>
              <CFormInput
                id={'end-date'}
                type={'date'}
                value={endDate}
                onChange={handleRangeDate}
              />
            </CCol>
            <CCol sm={6} />
            <CCol xs={12} sm={2}>
              <CFormSelect
                id={'filter'}
                value={orderBy}
                aria-label="Default select example"
                options={filterOpts}
                onChange={handleChange}
              />
            </CCol>
          </CRow>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Maintainer</CTableHeaderCell>
                <CTableHeaderCell scope="col">Total equipment</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Repeated Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">Active</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {maintenances.map((maintenance) => (
                <CTableRow key={maintenance.id} className={'middle-vertical'}>
                  <CTableDataCell>{maintenance.id}</CTableDataCell>
                  <CTableDataCell>{maintenance.dateMaintenance}</CTableDataCell>
                  <CTableDataCell>
                    <a href="/">{maintenance.user.username}</a>
                  </CTableDataCell>
                  <CTableDataCell>{maintenance.equipments.length}</CTableDataCell>
                  <CTableDataCell>
                    <CBadge
                      color={
                        maintenance.status === 0
                          ? 'info'
                          : maintenance.status === 1
                          ? 'success'
                          : 'danger'
                      }
                    >
                      {sttMapping[maintenance.status]}
                    </CBadge>
                  </CTableDataCell>
                  <CTableDataCell>
                    {maintenance.repeatable ? typeMapping[maintenance.repeatedType] : 'None'}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color={'info'}
                      id={maintenance.id}
                      onClick={handleClickDetailBtn}
                      className={'icon-light m-1'}
                      size={'sm'}
                    >
                      <CIcon icon={cilDescription} />
                    </CButton>
                    <CButton className={'icon-light m-1'} size={'sm'}>
                      <CIcon icon={cilPencil} />
                    </CButton>
                    <CButton
                      id={maintenance.id}
                      onClick={handleClickAddBtn}
                      color={'success'}
                      className={'icon-light m-1'}
                      size={'sm'}
                    >
                      <CIcon icon={cilPlus} />
                    </CButton>
                    <CButton
                      id={maintenance.id}
                      onClick={handleClickNotificationBtn}
                      color={'warning'}
                      className={'icon-light m-1'}
                      size={'sm'}
                    >
                      <CIcon icon={cilBellExclamation} />
                    </CButton>
                    <CButton color={'danger'} className={'icon-light m-1'} size={'sm'}>
                      <CIcon icon={cilTrash} />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          <AppPagination
            metadata={store.getState().category.metadata}
            onSizeChange={(e) => setSize(parseInt(e.currentTarget.value))}
            onPageChange={(e) => setPage(parseInt(e.currentTarget.id))}
          />
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default List
