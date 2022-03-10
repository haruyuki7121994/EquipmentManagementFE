import {
  CAvatar,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CPagination,
  CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React from 'react'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'

const List = () => {
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
                    placeholder="Please input keyword"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </CInputGroup>
              </CCol>
              <CCol xs={6} sm={6}></CCol>
              <CCol xs={12} sm={2}>
                <CFormSelect
                  aria-label="Default select example"
                  options={[
                    'Filter',
                    { label: 'One', value: '1' },
                    { label: 'Two', value: '2' },
                    { label: 'Three', value: '3', disabled: true },
                  ]}
                />
              </CCol>
            </CRow>
          </CContainer>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Active</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow className={'middle-vertical'}>
                <CTableHeaderCell scope="row">
                  <CAvatar size="md" src={avatar1} />
                </CTableHeaderCell>
                <CTableDataCell>Yen Pham</CTableDataCell>
                <CTableDataCell>admin1@gmail.com</CTableDataCell>
                <CTableDataCell>
                  <CBadge color="success">Active</CBadge>
                </CTableDataCell>
                <CTableDataCell />
              </CTableRow>
              <CTableRow className={'middle-vertical'}>
                <CTableHeaderCell scope="row">
                  <CAvatar size="md" src={avatar2} />
                </CTableHeaderCell>
                <CTableDataCell>Ryan Nguyen</CTableDataCell>
                <CTableDataCell>admin2@gmail.com</CTableDataCell>
                <CTableDataCell>
                  <CBadge color="danger">Inactive</CBadge>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton className={'icon-light m-1'} size={'sm'} color={'success'}>
                    Approve
                  </CButton>
                  <CButton color={'danger'} className={'icon-light m-1'} size={'sm'}>
                    Reject
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
          <CRow>
            <CCol xs={12} sm={4}>
              <CPagination aria-label="Page navigation example">
                <CPaginationItem>Previous</CPaginationItem>
                <CPaginationItem>1</CPaginationItem>
                <CPaginationItem>2</CPaginationItem>
                <CPaginationItem>3</CPaginationItem>
                <CPaginationItem>Next</CPaginationItem>
              </CPagination>
            </CCol>
            <CCol xs={6} sm={6}></CCol>
            <CCol xs={12} sm={2}>
              <CInputGroup className="mb-3">
                <CFormSelect id="inputGroupSelect01">
                  <option value="1">5 items</option>
                  <option value="2">10 items</option>
                  <option value="3">15 items</option>
                </CFormSelect>
              </CInputGroup>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default List
