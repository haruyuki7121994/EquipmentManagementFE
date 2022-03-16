import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CFormInput,
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

import { useDispatch } from 'react-redux'
import UserService from '../../services/UserService'
import { STATUS_CODE } from '../../api'
import avatar from '../../assets/images/avatars/admin_avatar.jpg'
import { AppPagination } from '../../components/AppPagination'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import { alertReducer } from '../../redux/reducers/alertReducer'
import AlertService from '../../services/AlertService'
import { AppPopupWarning } from '../../components/AppPopupWarning'
import { AppAlert } from '../../components/AppAlert'

const List = () => {
  const [admins, setAdmins] = useState([])
  const [keyword, setKeyword] = useState('')
  const [metadata, setMetadata] = useState({})
  const [count, setCount] = useState(0)
  const [popup, setPopup] = useState({ show: false, id: null })
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)
  const dispatch = useDispatch()

  useEffect(() => {
    const data = {
      params: {
        page: page,
        size: size,
        role: 'guest',
        keyword: keyword,
        orderBy: 'id-desc',
      },
    }
    UserService.getAll(data).then((res) => {
      const data = res.data
      if (data.status === STATUS_CODE.SUCCESS) {
        setAdmins(res.data.data.users)
        setMetadata(res.data.metadata)
      }
    })
  }, [count, dispatch, keyword, page, size])

  const handleClickDeleteBtn = (e) => {
    setPopup({ show: true, id: e.currentTarget.id })
  }
  const handleDeleteTrue = (e) => {
    if (popup.show && popup.id) {
      UserService.remove(popup.id)
        .then((res) => {
          const data = res.data
          if (data.status === STATUS_CODE.SUCCESS) {
            setCount(count + 1)
            dispatch(alertReducer.actions.set(AlertService.getPayload('Delete Successful!')))
          }
        })
        .catch((reason) => {
          if (reason.response.status === STATUS_CODE.BAD_REQUEST) {
            dispatch(alertReducer.actions.set(AlertService.getPayload('Delete Failed!')))
          }
        })
      handleDeleteFalse()
    }
  }

  const handleDeleteFalse = () => {
    setPopup({ show: false, id: null })
  }
  return (
    // Table
    <CCol xs={12}>
      <AppPopupWarning
        visible={popup.show}
        handleDeleteTrue={handleDeleteTrue}
        handleDeleteFalse={handleDeleteFalse}
      />
      <CCard className="mb-4">
        <CCardHeader>
          <strong>List Admins</strong>
        </CCardHeader>
        <CCardBody>
          <AppAlert />
          <CContainer>
            <CRow>
              <CCol xs={12} sm={4}>
                <CInputGroup className="mb-3">
                  <CInputGroupText id="basic-addon1">Search by email: </CInputGroupText>
                  <CFormInput
                    value={keyword}
                    placeholder="Please input keyword"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setKeyword(e.currentTarget.value)}
                  />
                </CInputGroup>
              </CCol>
            </CRow>
          </CContainer>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
                <CTableHeaderCell scope="col">Active</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {admins.length > 0
                ? admins.map((admin) => (
                    <CTableRow key={admin.id} className={'middle-vertical'}>
                      <CTableHeaderCell scope="row">
                        <CAvatar size="md" src={avatar} />
                      </CTableHeaderCell>
                      <CTableDataCell>{admin.username}</CTableDataCell>
                      <CTableDataCell>{admin.email}</CTableDataCell>
                      <CTableDataCell>{admin.address}</CTableDataCell>
                      <CTableDataCell>{admin.phone}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          id={admin.id}
                          onClick={handleClickDeleteBtn}
                          color={'danger'}
                          className={'icon-light m-1'}
                          size={'sm'}
                        >
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                : null}
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
