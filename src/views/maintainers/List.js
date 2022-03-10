import {
  CAvatar,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormSelect,
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
import { cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { STATUS_CODE } from '../../api'
import UserService from '../../services/UserService'
import { maintainerReducer } from '../../redux/reducers/maintainerReducer'
import store from '../../store'
import { AppPagination } from '../../components/AppPagination'
import { AppPopupWarning } from '../../components/AppPopupWarning'
import { alertReducer } from '../../redux/reducers/alertReducer'
import AlertService from '../../services/AlertService'
import { AppAlert } from '../../components/AppAlert'
import CookieService from '../../services/CookieService'

const List = () => {
  const [maintainers, setMaintainers] = useState([])
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)
  const [count, setCount] = useState(0)
  const [popup, setPopup] = useState({ show: false, id: null })
  const dispatch = useDispatch()
  const navigate = useHistory()

  useEffect(() => {
    const data = {
      params: {
        page: page,
        size: size,
        role: 'maintainer',
        keyword: keyword,
      },
    }
    UserService.getAll(data).then((res) => {
      const data = res.data
      if (data.status === STATUS_CODE.SUCCESS) {
        console.log(data)
        dispatch(
          maintainerReducer.actions.getList({
            maintainers: data.data.users,
            metadata: data.metadata,
          }),
        )
      }
      setMaintainers(res.data.data.users)
    })
  }, [count, dispatch, keyword, page, size])

  const handleClickDeleteBtn = (e) => {
    setPopup({ show: true, id: e.currentTarget.id })
  }

  const handleClickUpdateBtn = (e) => {
    saveId(e.currentTarget.id)
    UserService.get(e.currentTarget.id).then((res) => {
      const data = res.data
      if (data.status === STATUS_CODE.SUCCESS) {
        dispatch(
          maintainerReducer.actions.find({
            data: data.data,
          }),
        )
        navigate.push('/maintainers/edit')
      }
    })
  }

  const saveId = (id) => {
    CookieService.save('maintainer_id', id)
  }

  const handleDeleteTrue = (e) => {
    if (popup.show && popup.id) {
      UserService.remove(popup.id)
        .then((res) => {
          const data = res.data
          if (data.status === STATUS_CODE.SUCCESS) setCount(count + 1)
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
          <strong>List Maintainers</strong>
        </CCardHeader>
        <CCardBody>
          <AppAlert />
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
            <CCol xs={6} sm={6} />
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
              {maintainers.map((maintainer) => (
                <CTableRow key={maintainer.id} className={'middle-vertical'}>
                  <CTableHeaderCell scope="row">
                    <CAvatar size="md" src={avatar1} />
                  </CTableHeaderCell>
                  <CTableDataCell>{maintainer.username}</CTableDataCell>
                  <CTableDataCell>{maintainer.email}</CTableDataCell>
                  <CTableDataCell>
                    <CBadge color={maintainer._active ? 'success' : 'danger'}>
                      {maintainer._active ? 'Active' : 'Inactive'}
                    </CBadge>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      id={maintainer.id}
                      onClick={handleClickUpdateBtn}
                      className={'icon-light m-1'}
                      size={'sm'}
                    >
                      <CIcon icon={cilPencil} />
                    </CButton>
                    <CButton
                      id={maintainer.id}
                      onClick={handleClickDeleteBtn}
                      color={'danger'}
                      className={'icon-light m-1'}
                      size={'sm'}
                    >
                      <CIcon icon={cilTrash} />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          <AppPagination
            metadata={store.getState().maintainer.metadata}
            onSizeChange={(e) => setSize(parseInt(e.currentTarget.value))}
            onPageChange={(e) => setPage(parseInt(e.currentTarget.id))}
          />
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default List
