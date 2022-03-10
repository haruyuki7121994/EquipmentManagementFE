import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode.react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import EquipmentService from '../../services/EquipmentService'
import { STATUS_CODE } from '../../api'
import { AppPagination } from '../../components/AppPagination'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import MaintenanceService from '../../services/MaintenanceService'
import { currentMaintenance } from '../../redux/selectors'
import { alertReducer } from '../../redux/reducers/alertReducer'
import AlertService from '../../services/AlertService'
import CookieService from '../../services/CookieService'
import { maintenanceReducer } from '../../redux/reducers/maintenanceReducer'

const AddEquipment = () => {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)
  const [keyword, setKeyword] = useState('')
  const [metadata, setMetadata] = useState({})
  let [listQrcode, setListQrcode] = useState([])
  const dispatch = useDispatch()
  const navigate = useHistory()
  const maintenance = useSelector(currentMaintenance)
  console.log(maintenance)

  useEffect(() => {
    const data = {
      params: {
        page: page,
        size: size,
        maintenance: 'isNull',
        keyword: keyword,
      },
    }
    EquipmentService.getAll(data).then((res) => {
      const data = res.data
      if (data.status === STATUS_CODE.SUCCESS) {
        setItems(res.data.data.equipments)
        setMetadata(res.data.metadata)
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
  }, [dispatch, page, size, keyword, maintenance])

  const handleCheckBtn = (e) => {
    const qrcode = e.currentTarget.id
    if (listQrcode.includes(qrcode)) return
    setListQrcode([...listQrcode, qrcode])
  }

  const handleRemoveQrcode = (e) => {
    const qrcode = e.currentTarget.id
    const newListQrcode = listQrcode.filter((qr) => qr !== qrcode)
    setListQrcode(newListQrcode)
  }

  const qrcodeCheckedComponent = (listQrcode) => {
    let qrcodeComponent = []
    let subArray = []
    for (let i = 0; i < listQrcode.length; i++) {
      subArray.push(listQrcode[i])
      if ((i + 1) % 6 === 0) {
        qrcodeComponent.push(subArray)
        subArray = []
      }
    }
    if (subArray.length > 0) qrcodeComponent.push(subArray)
    return (
      <CTable>
        {qrcodeComponent.map((item, index) => {
          return (
            <CTableRow key={index} className={'text-center'}>
              {item.map((subItem, subIndex) => {
                return (
                  <CTableHeaderCell key={subIndex}>
                    <QRCode
                      id="qrcode"
                      value={subItem}
                      size={90}
                      level={'H'}
                      includeMargin={true}
                    />
                    <div>{subItem}</div>
                    <div style={{ cursor: 'pointer' }} id={subItem} onClick={handleRemoveQrcode}>
                      <CIcon icon={cilTrash} size={'xl'} />
                    </div>
                  </CTableHeaderCell>
                )
              })}
            </CTableRow>
          )
        })}
      </CTable>
    )
  }

  const handleSubmit = (e) => {
    const data = { equipmentListQrcode: listQrcode }
    MaintenanceService.addEquipments(data, maintenance.id).then((res) => {
      if (res.data.status === STATUS_CODE.SUCCESS) {
        dispatch(alertReducer.actions.set(AlertService.getPayload('Add Equipments Successful!')))
        navigate.push('/maintenance/list')
      }
    })
  }
  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Add Equipment</strong>
        </CCardHeader>
        <CCardBody>
          <CForm className="row g-2">
            <CRow>
              <CCol md={6} className="mb-3">
                <CFormLabel htmlFor="is_active">
                  Search Equipment <span style={{ color: 'red' }}>(*)</span>
                </CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText id="basic-addon1">Search </CInputGroupText>
                  <CFormInput
                    value={keyword}
                    onChange={(e) => setKeyword(e.currentTarget.value)}
                    placeholder="Please input keyword"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </CInputGroup>
              </CCol>
            </CRow>
            <CCard>
              <CCardHeader>Select Equipment</CCardHeader>
              <CCardBody>
                <CTable hover>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col" className={'text-center'}>
                        #
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Location</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {items.map((item) => (
                      <CTableRow key={item.id} className={'middle-vertical'}>
                        <CTableHeaderCell scope="row">
                          <div className={'text-center'}>
                            <QRCode
                              id="qrcode"
                              value={item.qrcode}
                              size={64}
                              level={'H'}
                              includeMargin={true}
                            />
                            <p>{item.qrcode}</p>
                          </div>
                        </CTableHeaderCell>
                        <CTableDataCell>{item.name}</CTableDataCell>
                        <CTableDataCell>{item.category.name}</CTableDataCell>
                        <CTableDataCell>
                          <CBadge color={item.status ? 'success' : 'danger'}>
                            {item.status ? 'Active' : 'Inactive'}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell>
                          {item.location.length > 50
                            ? `${item.location.slice(0, 50)}...`
                            : item.location}
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton id={item.qrcode} onClick={handleCheckBtn}>
                            Add
                          </CButton>
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
            <CCol md={12} className="mt-2">
              <h4>Information</h4>
              <p>Total Equipment: {listQrcode.length}</p>
            </CCol>
            <CCard>
              <CCardHeader>List Equipment Checked</CCardHeader>
              <CCardBody>
                {listQrcode.length > 0 ? qrcodeCheckedComponent(listQrcode) : <p>No Equipment</p>}
              </CCardBody>
            </CCard>
            <CCol xs={12}>
              <CButton onClick={handleSubmit}>Submit</CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default AddEquipment
