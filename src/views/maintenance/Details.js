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
import React, { useEffect } from 'react'
import QRCode from 'qrcode.react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { currentMaintenance } from '../../redux/selectors'
import MaintenanceService from '../../services/MaintenanceService'
import { STATUS_CODE } from '../../api'
import { maintenanceReducer } from '../../redux/reducers/maintenanceReducer'
import CookieService from '../../services/CookieService'

const Detail = () => {
  const dispatch = useDispatch()
  const maintenance = useSelector(currentMaintenance)
  const typeOptions = MaintenanceService.typeOptions
  const sttMapping = MaintenanceService.sttMapping
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
                      <CTableHeaderCell>QrCode</CTableHeaderCell>
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
                          <QRCode
                            id="qrcode"
                            value={item.qrcode}
                            size={50}
                            level={'H'}
                            includeMargin={true}
                          />
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
                          <CButton color={'danger'} style={{ color: 'white' }}>
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
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default Detail
