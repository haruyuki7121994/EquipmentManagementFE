import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormCheck,
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
import QRCode from 'qrcode.react'
import React, { useEffect, useState } from 'react'
import store from '../../store'
import { AppPagination } from '../../components/AppPagination'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import EquipmentService from '../../services/EquipmentService'
import { STATUS_CODE } from '../../api'
import { equipmentReducer } from '../../redux/reducers/equipmentReducer'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'

const Export = () => {
  const pxMapping = {
    s: 64,
    m: 90,
    l: 142,
  }
  const perPageMapping = {
    s: 56,
    m: 36,
    l: 16,
  }
  const [sizeQrcode, setSizeQrcode] = useState('s')
  const [keyword, setKeyword] = useState('')
  const [px, setPx] = useState(64)
  const [pageQrcode, setPageQrcode] = useState(0)
  let [listQrcode, setListQrcode] = useState([])
  const [items, setItems] = useState([])
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)
  const dispatch = useDispatch()
  const navigate = useHistory()
  useEffect(() => {
    const data = {
      params: {
        page: page,
        size: size,
        keyword: keyword,
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
  }, [dispatch, page, size, keyword])
  const handleSize = (e) => {
    const size = e.currentTarget.id
    setSizeQrcode(size)
    setPx(pxMapping[size])
    calculateTotalPages(listQrcode.length, perPageMapping[size])
  }
  const handleClickDetailBtn = (e) => {
    EquipmentService.get(e.currentTarget.id).then((res) => {
      const data = res.data
      if (data.status === STATUS_CODE.SUCCESS) {
        dispatch(
          equipmentReducer.actions.find({
            data: data.data,
          }),
        )
        navigate.push('/equipments/details')
      }
    })
  }
  const handleCheckBtn = (e) => {
    const qrcode = e.currentTarget.id
    if (listQrcode.includes(qrcode)) return
    setListQrcode([...listQrcode, qrcode])

    calculateTotalPages(listQrcode.length + 1, perPageMapping[sizeQrcode])
  }

  const calculateTotalPages = (qrcodeLength, perPage) => {
    let totalPages = 0

    if (qrcodeLength === 0) {
      setPageQrcode(totalPages)
      return
    } else if (qrcodeLength > 0) totalPages++

    if (perPage >= qrcodeLength) {
      setPageQrcode(totalPages)
      return
    }
    totalPages = parseInt(qrcodeLength / perPage)
    if (qrcodeLength % perPage > 0) totalPages = totalPages + 1
    setPageQrcode(totalPages)
  }

  const handleRemoveQrcode = (e) => {
    const qrcode = e.currentTarget.id
    const newListQrcode = listQrcode.filter((qr) => qr !== qrcode)
    setListQrcode(newListQrcode)
    calculateTotalPages(newListQrcode.length, perPageMapping[sizeQrcode])
  }

  const handleSubmit = (e) => {
    if (listQrcode.length === 0) return
    dispatch(
      equipmentReducer.actions.export({
        qrcodeSize: sizeQrcode,
        totalItems: listQrcode,
        totalPages: pageQrcode,
      }),
    )
    navigate.push('/equipments/a4')
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
  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Export Qrcode</strong>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol md={12} className="mb-3">
              <CFormLabel htmlFor="name">
                QrCode Size <span style={{ color: 'red' }}>(*)</span>
              </CFormLabel>
              <CFormCheck
                type="radio"
                name="flexRadioDefault"
                id="s"
                label="S (56 items per page)"
                defaultChecked
                onClick={handleSize}
              />
              <CFormCheck
                type="radio"
                onClick={handleSize}
                name="flexRadioDefault"
                id="m"
                label="M (36 items per page)"
              />
              <CFormCheck
                type="radio"
                onClick={handleSize}
                name="flexRadioDefault"
                id="l"
                label="L (16 items per page)"
              />
              <QRCode id="qrcode-s" value={'abc'} size={px} level={'H'} includeMargin={true} />
            </CCol>
          </CRow>
          <CRow>
            <CCol md={12} className="mb-3">
              <h4>Input Qrcode from Table</h4>
              <CCol xs={12} sm={4}>
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
                      <CTableDataCell>
                        <a
                          href="javascript:void(0)"
                          id={item.qrcode}
                          onClick={handleClickDetailBtn}
                        >
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
                        {item.location.length > 50
                          ? `${item.location.slice(0, 50)}...`
                          : item.location}
                      </CTableDataCell>
                      <CTableDataCell>
                        {!listQrcode.includes(item.qrcode) ? (
                          <CButton id={item.qrcode} onClick={handleCheckBtn}>
                            Add
                          </CButton>
                        ) : null}
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
            </CCol>
          </CRow>
          <CCol md={12} className="mb-3">
            <h4>Information</h4>
            <p>Qrcode size: {sizeQrcode.toUpperCase()}</p>
            <p>Total items: {listQrcode.length}</p>
            <p>Total pages: {pageQrcode}</p>
          </CCol>
          <CCard>
            <CCardHeader>List Qrcode Checked</CCardHeader>
            <CCardBody>
              {listQrcode.length > 0 ? qrcodeCheckedComponent(listQrcode) : <p>No Qrcode</p>}
            </CCardBody>
            <CButton disabled={listQrcode.length === 0} onClick={handleSubmit}>
              Preview
            </CButton>
          </CCard>
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default Export
