import {
  CAvatar,
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
import { useHistory } from 'react-router-dom'
import UserService from '../../services/UserService'
import { STATUS_CODE } from '../../api'
import avatar from '../../assets/images/avatars/admin_avatar.jpg'
import { AppPagination } from '../../components/AppPagination'

const List = () => {
  const [admins, setAdmins] = useState([])
  const [keyword, setKeyword] = useState('')
  const [metadata, setMetadata] = useState({})
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)
  const dispatch = useDispatch()

  useEffect(() => {
    const data = {
      params: {
        page: page,
        size: size,
        role: 'admin',
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
  }, [dispatch, keyword, page, size])
  return (
    // Table
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>List Admins</strong>
        </CCardHeader>
        <CCardBody>
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
