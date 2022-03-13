import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { STATUS_CODE } from '../../api'
import { useDispatch } from 'react-redux'
import { AppPagination } from '../../components/AppPagination'
import { AppAlert } from '../../components/AppAlert'
import { AppPopupWarning } from '../../components/AppPopupWarning'
import EquipmentService from '../../services/EquipmentService'
import { alertReducer } from '../../redux/reducers/alertReducer'
import AlertService from '../../services/AlertService'

const List = () => {
  const [visible, setVisible] = useState(false)
  const [qrcodeList, setQrcodeList] = useState([])
  const [logs, setLogs] = useState([])
  const [metadata, setMetadata] = useState({})
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [orderBy, setOrderBy] = useState('id-desc')
  const [count, setCount] = useState(0)
  const [popup, setPopup] = useState({ show: false, id: null })
  const dispatch = useDispatch()
  const sttMapping = EquipmentService.sttLogMapping

  const filterOpts = [
    { label: 'Id Descending', value: 'id-desc' },
    { label: 'Id Ascending', value: 'id-asc' },
  ]

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
    EquipmentService.getLogs(data).then((res) => {
      const data = res.data
      if (data.status === STATUS_CODE.SUCCESS) {
        console.log(data)
        setLogs(res.data.data.logs)
        setMetadata(res.data.metadata)
      }
    })
  }, [count, dispatch, orderBy, page, size, startDate, endDate])

  const handleChange = (e) => {
    setOrderBy(e.currentTarget.value)
  }

  const handleRangeDate = (e) => {
    console.log(e.currentTarget.value)
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

  const handleClickRemoveBtn = (e) => {
    setPopup({ show: true, id: e.currentTarget.id })
  }

  const handleDeleteTrue = (e) => {
    if (popup.show && popup.id) {
      EquipmentService.rollback(popup.id)
        .then((res) => {
          dispatch(alertReducer.actions.set(AlertService.getPayload(res.data.message)))
          setCount(count + 1)
          console.log(res)
        })
        .catch((res) => console.log(res.response))
      handleDeleteFalse()
    }
  }

  const handleDeleteFalse = () => {
    setPopup({ show: false, id: null })
  }

  const handleClickViewList = (e) => {
    const list = logs.find((item) => item.id === parseInt(e.currentTarget.id))
    if (list !== undefined) {
      const qrcodeList = JSON.parse(list.qrcodeList)
      setQrcodeList(qrcodeList)
    }
    setVisible(!visible)
  }

  return (
    // Table
    <CCol xs={12}>
      <AppPopupWarning
        visible={popup.show}
        handleDeleteTrue={handleDeleteTrue}
        handleDeleteFalse={handleDeleteFalse}
      />
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>List Qrcode</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>
            <strong>Total: {qrcodeList.length}</strong>
          </p>
          <div style={{ height: '500px', overflow: 'scroll' }}>
            {qrcodeList.map((qrcode) => (
              <p key={qrcode}>{qrcode}</p>
            ))}
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>List Logs</strong>
        </CCardHeader>
        <CCardBody>
          <AppAlert />
          <CRow>
            <CCol xs={12} sm={3}>
              <CFormInput
                id={'start-date'}
                type={'datetime-local'}
                value={startDate}
                pattern={'yyyy-mm-dd HH:mm:ss'}
                onChange={handleRangeDate}
              />
            </CCol>
            <CCol xs={12} sm={3}>
              <CFormInput
                id={'end-date'}
                type={'datetime-local'}
                value={endDate}
                onChange={handleRangeDate}
              />
            </CCol>
            <CCol sm={4} />
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
                <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">CreatedAt</CTableHeaderCell>
                <CTableHeaderCell scope="col">CompletedAt</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {logs.map((item) => (
                <CTableRow key={item.id} className={'middle-vertical'}>
                  <CTableDataCell>{item.id}</CTableDataCell>
                  <CTableDataCell>{item.quantity}</CTableDataCell>
                  <CTableDataCell>{item.created}</CTableDataCell>
                  <CTableDataCell>
                    <CBadge
                      color={item.status === 0 ? 'info' : item.status === 1 ? 'success' : 'danger'}
                    >
                      {sttMapping[item.status]}
                    </CBadge>
                  </CTableDataCell>
                  <CTableDataCell>{item.createdAt}</CTableDataCell>
                  <CTableDataCell>{item.completedAt}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      onClick={handleClickViewList}
                      id={item.id}
                      color={'info'}
                      className={'icon-light m-1'}
                      size={'sm'}
                    >
                      View List
                    </CButton>
                    {item.status === 1 ? (
                      <CButton
                        id={item.id}
                        onClick={handleClickRemoveBtn}
                        color={'danger'}
                        className={'icon-light m-1'}
                        size={'sm'}
                      >
                        Rollback
                      </CButton>
                    ) : null}
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          <AppPagination
            metadata={metadata}
            onSizeChange={(e) => setSize(parseInt(e.currentTarget.value))}
            onPageChange={(e) => setPage(parseInt(e.currentTarget.id))}
          />
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default List
