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
import QRCode from 'qrcode.react'
import React, { useEffect, useState } from 'react'
import { cilDescription, cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { STATUS_CODE } from '../../api'
import EquipmentService from '../../services/EquipmentService'
import { equipmentReducer } from '../../redux/reducers/equipmentReducer'
import store from '../../store'
import { AppPagination } from '../../components/AppPagination'
import { AppAlert } from '../../components/AppAlert'
import { alertReducer } from '../../redux/reducers/alertReducer'
import AlertService from '../../services/AlertService'
import { AppPopupWarning } from '../../components/AppPopupWarning'
import CookieService from '../../services/CookieService'

const List = () => {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)
  const [count, setCount] = useState(0)
  const [keyword, setKeyword] = useState('')
  const [orderBy, setOrderBy] = useState('id-desc')
  const [popup, setPopup] = useState({ show: false, id: null })
  const dispatch = useDispatch()
  const navigate = useHistory()

  const filterOpts = [
    { label: 'Id Descending', value: 'id-desc' },
    { label: 'Id Ascending', value: 'id-asc' },
    { label: 'Qrcode Descending', value: 'qrcode-desc' },
    { label: 'Qrcode Ascending', value: 'qrcode-asc' },
    { label: 'Name Descending', value: 'name-desc' },
    { label: 'Name Ascending', value: 'name-asc' },
  ]

  useEffect(() => {
    const data = {
      params: {
        page: page,
        size: size,
        keyword: keyword,
        orderBy: orderBy,
      },
    }
    EquipmentService.getAll(data).then((res) => {
      const data = res.data
      if (data.status === STATUS_CODE.SUCCESS) {
        dispatch(
          equipmentReducer.actions.getList({
            equipments: data.data.equipments,
            metadata: data.metadata,
          }),
        )
        setItems(res.data.data.equipments)
      }
    })
  }, [count, dispatch, keyword, orderBy, page, size])

  const handleClickDeleteBtn = (e) => {
    setPopup({ show: true, id: e.currentTarget.id })
  }

  const handleDeleteTrue = (e) => {
    if (popup.show && popup.id) {
      EquipmentService.remove(popup.id)
        .then((res) => {
          const data = res.data
          if (data.status === STATUS_CODE.SUCCESS) {
            setCount(count + 1)
            dispatch(alertReducer.actions.set(AlertService.getPayload('Delete Successful!')))
          }
        })
        .catch((e) => {
          if (e.response.status === STATUS_CODE.ERROR) {
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
    saveId(e.currentTarget.id)
    EquipmentService.get(e.currentTarget.id).then((res) => {
      const data = res.data
      if (data.status === STATUS_CODE.SUCCESS) {
        dispatch(
          equipmentReducer.actions.find({
            data: data.data,
          }),
        )
        navigate.push('/equipments/edit')
      }
    })
  }

  const handleClickDetailBtn = (e) => {
    saveId(e.currentTarget.id)
    EquipmentService.get(e.currentTarget.id).then((res) => {
      const data = res.data
      if (data.status === STATUS_CODE.SUCCESS) {
        dispatch(
          equipmentReducer.actions.find({
            data: data.data,
          }),
        )
        // navigate.createHref('/equipments/details')
        navigate.push('/equipments/details')
      }
    })
  }

  const saveId = (id) => {
    CookieService.save('equipment_id', id)
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
          <strong>List Equipments</strong>
        </CCardHeader>
        <CCardBody>
          <AppAlert />
          <CRow>
            <CCol xs={12} sm={4}>
              <CInputGroup className="mb-3">
                <CInputGroupText id="basic-addon1">Search </CInputGroupText>
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
                aria-label="Default select example"
                options={filterOpts}
                value={orderBy}
                onChange={handleChange}
              />
            </CCol>
          </CRow>
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
                <CTableHeaderCell scope="col">Active</CTableHeaderCell>
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
                        size={90}
                        level={'H'}
                        includeMargin={true}
                      />
                      <p>{item.qrcode}</p>
                    </div>
                  </CTableHeaderCell>
                  <CTableDataCell>
                    <a href="javascript:void(0)" id={item.qrcode} onClick={handleClickDetailBtn}>
                      {item.name}
                    </a>
                  </CTableDataCell>
                  <CTableDataCell>{item.category.name}</CTableDataCell>
                  <CTableDataCell>
                    <CBadge color={item.status ? 'success' : 'danger'}>
                      {item.status ? 'Active' : 'Inactive'}
                    </CBadge>
                  </CTableDataCell>
                  <CTableDataCell>
                    {item.location.length > 50 ? `${item.location.slice(0, 50)}...` : item.location}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      id={item.qrcode}
                      onClick={handleClickDetailBtn}
                      color={'info'}
                      className={'icon-light m-1'}
                      size={'sm'}
                    >
                      <CIcon icon={cilDescription} />
                    </CButton>
                    <CButton
                      id={item.qrcode}
                      onClick={handleClickUpdateBtn}
                      className={'icon-light m-1'}
                      size={'sm'}
                    >
                      <CIcon icon={cilPencil} />
                    </CButton>
                    <CButton
                      id={item.id}
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
            metadata={store.getState().equipment.metadata}
            onSizeChange={(e) => setSize(parseInt(e.currentTarget.value))}
            onPageChange={(e) => setPage(parseInt(e.currentTarget.id))}
          />
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default List
