import {
  CAvatar,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
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
import avatar from 'src/assets/images/avatars/maintainer_avatar.jpg'
import QRCode from 'qrcode.react'
import { useDispatch, useSelector } from 'react-redux'
import { currentMaintainer } from '../../redux/selectors'
import CookieService from '../../services/CookieService'
import { STATUS_CODE } from '../../api'
import UserService from '../../services/UserService'
import { maintainerReducer } from '../../redux/reducers/maintainerReducer'
import MaintenanceService from '../../services/MaintenanceService'
import CommentService from '../../services/CommentService'
import { AppPagination } from '../../components/AppPagination'
import { useHistory } from 'react-router-dom'

const Detail = () => {
  const dispatch = useDispatch()
  const maintainer = useSelector(currentMaintainer)

  const [pageMaintenance, setPageMaintenance] = useState(0)
  const [sizeMaintenance, setSizeMaintenance] = useState(5)
  const [metadataMaintenance, setMetadataMaintenance] = useState({})
  const [maintenances, setMaintenances] = useState([])
  const sttMapping = MaintenanceService.sttMapping
  const typeMapping = ['Every Week', 'Every Month', 'Every Quarter', 'Every Year']

  const [pageComment, setPageComment] = useState(0)
  const [sizeComment, setSizeComment] = useState(5)
  const [metadataComment, setMetadataComment] = useState({})
  const [comments, setComments] = useState([])

  const navigate = useHistory()

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

    if (Object.keys(maintainer).length > 0 && (pageMaintenance || sizeMaintenance)) {
      const maintenanceData = {
        params: {
          page: pageMaintenance,
          size: sizeMaintenance,
          orderBy: 'dateMaintenance-asc',
          username: maintainer.username,
        },
      }
      MaintenanceService.getAll(maintenanceData).then((res) => {
        const data = res.data
        if (data.status === STATUS_CODE.SUCCESS) {
          setMaintenances(data.data.maintenances)
          setMetadataMaintenance(data.metadata)
        }
      })
    }

    if (Object.keys(maintainer).length > 0 && (pageComment || sizeComment)) {
      const commentData = {
        params: {
          page: pageComment,
          size: sizeComment,
          orderBy: 'createdAt-desc',
          username: maintainer.username,
        },
      }
      CommentService.getAll(commentData).then((res) => {
        const data = res.data
        if (data.status === STATUS_CODE.SUCCESS) {
          setComments(data.data.comments)
          setMetadataComment(data.metadata)
        }
      })
    }
  }, [dispatch, maintainer, pageMaintenance, sizeMaintenance, pageComment, sizeComment])

  const handleClickUpdateBtn = (e) => {
    navigate.push('/maintainers/edit')
  }

  const handleClickEquipment = (e) => {
    CookieService.save('equipment_id', e.currentTarget.id)
    navigate.push('/equipments/details')
  }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Maintainer Details</strong>
        </CCardHeader>
        <CCardBody>
          <CCard>
            <CCardHeader>General</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md={6}>
                  <CTableHeaderCell scope="row">
                    <CAvatar className={'maintainer-avatar'} size="xl" src={avatar} />
                  </CTableHeaderCell>
                  <CCardTitle>{maintainer.username}</CCardTitle>
                  <CButton onClick={handleClickUpdateBtn}>Update</CButton>
                </CCol>
                <CCol md={6}>
                  <h4>Information</h4>
                  <br />
                  <CCardText>Email: {maintainer.email}</CCardText>
                  <CCardText>Phone number: {maintainer.phone}</CCardText>
                  <CCardText>Address: {maintainer.address}</CCardText>
                  <CCardText>
                    Status:{' '}
                    <CBadge color={maintainer._active ? 'success' : 'danger'}>
                      {maintainer._active ? 'Active' : 'Inactive'}
                    </CBadge>
                  </CCardText>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
          <br />
          <CCard>
            <CCardHeader>Comments</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-3 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>QrCode</CTableHeaderCell>
                    <CTableHeaderCell>Equipment</CTableHeaderCell>
                    <CTableHeaderCell>Comment</CTableHeaderCell>
                    <CTableHeaderCell>Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {comments.length > 0
                    ? comments.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                          <CTableDataCell>
                            <QRCode
                              id="qrcode"
                              value={item.equipment !== undefined ? item.equipment.qrcode : 'abc'}
                              size={50}
                              level={'H'}
                              includeMargin={true}
                            />
                          </CTableDataCell>
                          <CTableDataCell>
                            <CLink id={item.equipment.qrcode} onClick={handleClickEquipment}>
                              {item.equipment.name}
                            </CLink>
                          </CTableDataCell>
                          <CTableDataCell>{item.description}</CTableDataCell>
                          <CTableDataCell>
                            <div className="small text-medium-emphasis">Last comment</div>
                            <strong>{item.createdAt}</strong>
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    : null}
                </CTableBody>
              </CTable>
              <AppPagination
                metadata={metadataComment}
                onSizeChange={(e) => setPageComment(parseInt(e.currentTarget.value))}
                onPageChange={(e) => setSizeComment(parseInt(e.currentTarget.id))}
              />
            </CCardBody>
          </CCard>
          <br />
          <CCard>
            <CCardHeader>Maintenances</CCardHeader>
            <CCardBody>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Total equipment</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Repeated Type</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {maintenances.length > 0
                    ? maintenances.map((maintenance) => (
                        <CTableRow key={maintenance.id} className={'middle-vertical'}>
                          <CTableDataCell>{maintenance.id}</CTableDataCell>
                          <CTableDataCell>{maintenance.dateMaintenance}</CTableDataCell>
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
                            {maintenance.repeatable
                              ? typeMapping[maintenance.repeatedType]
                              : 'None'}
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    : null}
                </CTableBody>
              </CTable>
              <AppPagination
                metadata={metadataMaintenance}
                onSizeChange={(e) => setSizeMaintenance(parseInt(e.currentTarget.value))}
                onPageChange={(e) => setPageMaintenance(parseInt(e.currentTarget.id))}
              />
            </CCardBody>
          </CCard>
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default Detail
