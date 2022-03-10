import {
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
import { STATUS_CODE } from '../../api'
import { useDispatch } from 'react-redux'
import { categoryReducer } from '../../redux/reducers/categoryReducer'
import { useHistory } from 'react-router-dom'
import CategoryService from '../../services/CategoryService'
import { AppPagination } from '../../components/AppPagination'
import store from '../../store'
import { AppAlert } from '../../components/AppAlert'
import { AppPopupWarning } from '../../components/AppPopupWarning'
import { alertReducer } from '../../redux/reducers/alertReducer'
import AlertService from '../../services/AlertService'
import CookieService from '../../services/CookieService'
const List = () => {
  const [categories, setCategories] = useState([])
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)
  const [orderBy, setOrderBy] = useState('id-desc')
  const [keyword, setKeyword] = useState('')
  const [count, setCount] = useState(0)
  const [popup, setPopup] = useState({ show: false, id: null })
  const dispatch = useDispatch()
  const navigate = useHistory()

  const filterOpts = [
    { label: 'Id Descending', value: 'id-desc' },
    { label: 'Id Ascending', value: 'id-asc' },
    { label: 'Name Descending', value: 'name-desc' },
    { label: 'Name Ascending', value: 'name-asc' },
  ]

  useEffect(() => {
    const data = {
      params: {
        page: page,
        size: size,
        orderBy: orderBy,
        keyword: keyword,
      },
    }
    CategoryService.getAll(data).then((res) => {
      const data = res.data
      if (data.status === STATUS_CODE.SUCCESS) {
        dispatch(
          categoryReducer.actions.getList({
            categories: data.data.categories,
            metadata: data.metadata,
          }),
        )
      }
      setCategories(res.data.data.categories)
    })
  }, [dispatch, orderBy, page, size, keyword, count])

  const handleClickDeleteBtn = (e) => {
    setPopup({ show: true, id: e.currentTarget.id })
  }

  const handleDeleteTrue = () => {
    if (popup.show && popup.id) {
      CategoryService.remove(popup.id)
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
      setPopup({ show: false, id: null })
    }
  }

  const handleDeleteFalse = () => {
    setPopup({ show: false, id: null })
  }

  const handleClickUpdateBtn = (e) => {
    CookieService.save('current_id', e.currentTarget.id)
    CategoryService.get(e.currentTarget.id).then((res) => {
      const data = res.data
      if (data.status === STATUS_CODE.SUCCESS) {
        dispatch(
          categoryReducer.actions.find({
            data: data.data,
          }),
        )
        navigate.push('/categories/edit')
      }
    })
  }

  const handleInput = (e) => {
    const value = e.currentTarget.value
    setKeyword(value)
  }

  const handleChange = (e) => {
    setOrderBy(e.currentTarget.value)
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
          <strong>List Categories</strong>
        </CCardHeader>
        <CCardBody>
          <AppAlert />
          <CRow>
            <CCol xs={12} sm={4}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="basic-addon1">Search by name: </CInputGroupText>
                <CFormInput
                  placeholder="Please input keyword"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={keyword}
                  onInput={handleInput}
                />
              </CInputGroup>
            </CCol>
            <CCol xs={6} sm={6} />
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
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Active</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {categories.map((cate) => (
                <CTableRow key={cate.id} className={'middle-vertical'}>
                  <CTableHeaderCell scope="row">{cate.id}</CTableHeaderCell>
                  <CTableDataCell>{cate.name}</CTableDataCell>
                  <CTableDataCell>
                    <CBadge color={cate.isActive ? 'success' : 'danger'}>
                      {cate.isActive ? 'Active' : 'Inactive'}
                    </CBadge>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      id={cate.id}
                      onClick={handleClickUpdateBtn}
                      className={'icon-light m-1'}
                      size={'sm'}
                    >
                      <CIcon icon={cilPencil} />
                    </CButton>
                    <CButton
                      id={cate.id}
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
