import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCol,
  CLink,
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
import { currentMaintenance } from '../../redux/selectors'
import MaintenanceService from '../../services/MaintenanceService'
import { STATUS_CODE } from '../../api'
import { maintenanceReducer } from '../../redux/reducers/maintenanceReducer'
import CookieService from '../../services/CookieService'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import { alertReducer } from '../../redux/reducers/alertReducer'
import AlertService from '../../services/AlertService'

const Detail = () => {
  const dispatch = useDispatch()
  const maintenance = useSelector(currentMaintenance)
  let [listQrcode, setListQrcode] = useState([])
  const [change, setChange] = useState(false)
  const typeOptions = MaintenanceService.typeOptions
  const sttMapping = MaintenanceService.sttMapping
  useEffect(() => {
    if (Object.keys(maintenance).length === 0 || change) {
      const id = CookieService.get('maintenance_id')
      MaintenanceService.get(id).then((res) => {
        const data = res.data
        if (data.status === STATUS_CODE.SUCCESS) {
          dispatch(
            maintenanceReducer.actions.find({
              data: data.data,
            }),
          )
          setChange(false)
        }
      })
    }
  }, [change, dispatch, maintenance])

  const handleRemoveQrcode = (e) => {
    const qrcode = e.currentTarget.id
    const newListQrcode = listQrcode.filter((qr) => qr !== qrcode)
    setListQrcode(newListQrcode)
  }

  const handleCheckBtn = (e) => {
    const qrcode = e.currentTarget.id
    if (listQrcode.includes(qrcode)) return
    setListQrcode([...listQrcode, qrcode])
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
    MaintenanceService.removeEquipments(data, maintenance.id).then((res) => {
      if (res.data.status === STATUS_CODE.SUCCESS) {
        setChange(true)
        setListQrcode([])
      }
    })
  }
  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Maintenance Details</strong>
        </CCardHeader>
        <CCardBody>
          <CCard>
            <CCardHeader>General</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md={12}>
                  <h4>Information</h4>
                  <br />
                  <CCardText>Date: {maintenance.dateMaintenance}</CCardText>
                  <CCardText>
                    Total Equipments:{' '}
                    {maintenance.equipments !== undefined ? maintenance.equipments.length : 0}
                  </CCardText>
                  <CCardText>
                    Maintainer: {maintenance.user !== undefined ? maintenance.user.username : ''}
                  </CCardText>
                  <CCardText>
                    Status:{' '}
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
                  </CCardText>
                  <CCardText>Repeatable: {maintenance.repeatable ? 'Yes' : 'No'}</CCardText>
                  {maintenance.repeatable ? (
                    <CCardText>
                      Repeated Type:{' '}
                      {typeOptions
                        .filter((opt) => parseInt(opt.value) === maintenance.repeatedType)
                        .map((opt) => opt.label)}
                    </CCardText>
                  ) : null}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
          <br />
          <CCard>
            <CCardHeader>Equipments</CCardHeader>
            <CCardBody>
              {maintenance.equipments !== undefined ? (
                <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell className={'text-center'}>QrCode</CTableHeaderCell>
                      <CTableHeaderCell>Name</CTableHeaderCell>
                      <CTableHeaderCell>Status</CTableHeaderCell>
                      <CTableHeaderCell>Location</CTableHeaderCell>
                      <CTableHeaderCell>Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {maintenance.equipments.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell>
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
                        </CTableDataCell>
                        <CTableDataCell>
                          <CLink href="/">{item.name}</CLink>
                        </CTableDataCell>
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
                          <CButton
                            id={item.qrcode}
                            onClick={handleCheckBtn}
                            color={'danger'}
                            style={{ color: 'white' }}
                          >
                            Remove
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              ) : null}
            </CCardBody>
          </CCard>
          <CCard className={'mt-3'}>
            <CCardHeader>List Equipment Checked</CCardHeader>
            <CCardBody>
              {listQrcode.length > 0 ? qrcodeCheckedComponent(listQrcode) : <p>No Equipment</p>}
            </CCardBody>
          </CCard>
          <CCol xs={12} className={'mt-2'}>
            <CButton onClick={handleSubmit}>Submit</CButton>
          </CCol>
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default Detail
