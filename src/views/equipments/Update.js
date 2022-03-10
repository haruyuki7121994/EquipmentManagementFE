import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardImage,
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import CategoryService from '../../services/CategoryService'
import { STATUS_CODE } from '../../api'
import { useDispatch, useSelector } from 'react-redux'
import EquipmentService from '../../services/EquipmentService'
import { alertReducer } from '../../redux/reducers/alertReducer'
import AlertService from '../../services/AlertService'
import { AppSpinner } from '../../components/AppSpinner'
import { activeOptions, currentEquipment } from '../../redux/selectors'
import QRCode from 'qrcode.react'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import { EQUIPMENT_VALIDATOR } from '../../validator'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CookieService from '../../services/CookieService'
import { equipmentReducer } from '../../redux/reducers/equipmentReducer'

const Create = () => {
  const validator = EQUIPMENT_VALIDATOR
  const [invalidName, setInvalidName] = useState({ invalid: false, msg: '' })
  const [invalidActive, setInvalidActive] = useState({ invalid: false, msg: '' })
  const [invalidCategory, setInvalidCategory] = useState({ invalid: false, msg: '' })
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [images, setImages] = useState(null)
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [range, setRange] = useState('0')
  const [weight, setWeight] = useState('0')
  const [width, setWidth] = useState('0')
  const [height, setHeight] = useState('0')
  const [resolution, setResolution] = useState('0')
  const [status, setStatus] = useState('active')
  const [qrcode, setQrcode] = useState('')
  const [gallery, setGallery] = useState([])
  const [cateOpts, setCateOpts] = useState([])
  const equipment = useSelector(currentEquipment)
  const activeOpts = useSelector(activeOptions)
  const navigate = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    let cateOptions = [{ label: 'Select Category', value: '' }]
    let data = {
      params: {
        page: 0,
        size: 100,
      },
    }
    CategoryService.getAll(data).then((res) => {
      const data = res.data
      if (data.status === STATUS_CODE.SUCCESS) {
        res.data.data.categories.forEach((e) => {
          cateOptions.push({ label: e.name, value: e.id })
        })
        setCateOpts(cateOptions)
        setLoading(false)
      }
    })
    if (Object.keys(equipment).length === 0) {
      const id = CookieService.get('current_id')
      if (id === undefined) return
      EquipmentService.get(id).then((res) => {
        const data = res.data
        if (data.status === STATUS_CODE.SUCCESS) {
          dispatch(
            equipmentReducer.actions.find({
              data: data.data,
            }),
          )
        }
      })
    }
    if (Object.keys(equipment).length > 0) {
      setName(equipment.name)
      setCategory(equipment.category.id)
      setRange(equipment.range)
      setWidth(equipment.width)
      setWeight(equipment.weight)
      setHeight(equipment.height)
      setResolution(equipment.resolution)
      setStatus(equipment.status)
      setQrcode(equipment.qrcode)
      setGallery(equipment.images)
      setDescription(equipment.description)
      setLocation(equipment.location)
      setStatus(parseInt(equipment.status) === 1 ? 'active' : 'inactive')
    }
  }, [dispatch, equipment])

  const handleChange = (e) => {
    const type = e.currentTarget.id
    switch (type) {
      case 'category':
        setCategory(e.currentTarget.value)
        break
      case 'weight':
        setWeight(e.currentTarget.value)
        break
      case 'height':
        setHeight(e.currentTarget.value)
        break
      case 'width':
        setWidth(e.currentTarget.value)
        break
      case 'resolution':
        setResolution(e.currentTarget.value)
        break
      case 'range':
        setRange(e.currentTarget.value)
        break
      case 'images':
        setImages(e.currentTarget.files)
        break
      case 'name':
        setName(e.currentTarget.value)
        break
      case 'description':
        setDescription(e.currentTarget.value)
        break
      case 'location':
        setLocation(e.currentTarget.value)
        break
      case 'status':
        e.target.value === 'active' ? setStatus('active') : setStatus('inactive')
        break
      default:
        break
    }
  }

  const handleSubmit = (e) => {
    if (name.length === 0 || status.length === 0 || category.length === 0) {
      if (category.length === 0) {
        setInvalidCategory({ invalid: true, msg: validator.category.required })
      }
      if (name.length === 0) {
        setInvalidName({ invalid: true, msg: validator.name.required })
      }
      if (status.length === 0) {
        setInvalidActive({ invalid: true, msg: validator.active.required })
      }
      return
    }

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    }
    let formData = new FormData()
    formData.append('name', name)
    formData.append('weight', weight)
    formData.append('height', height)
    formData.append('width', width)
    formData.append('range', range)
    formData.append('resolution', resolution)
    formData.append('location', location)
    formData.append('description', description)
    formData.append('status', status === 'active' ? '1' : '0')
    formData.append('images', new File([], '', undefined))
    if (images != null) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i])
      }
    }
    formData.append('category_id', category)
    EquipmentService.edit(equipment.id, formData, config).then((r) => {
      const data = r.data
      if (data.status === STATUS_CODE.SUCCESS) {
        dispatch(alertReducer.actions.set(AlertService.getPayload('Create Successful!')))
        navigate.push('/equipments/list')
      }
    })
  }

  const handleClick = async (e) => {
    const type = e.currentTarget.id
    switch (type) {
      case 'gallery':
        const id = e.currentTarget.getAttribute('data-id')
        deleteImage(id, e)
        break
      default:
        break
    }
  }

  const deleteImage = (id) => {
    EquipmentService.removeImage(id).then((res) => {
      const data = res.data
      if (data.status === STATUS_CODE.SUCCESS) {
        document.querySelector(`div[data-id='${id}']`).remove()
      }
    })
  }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Edit Equipment</strong>
        </CCardHeader>
        <CCardBody>
          <CForm className="row g-2">
            <QRCode id="qrcode" value={qrcode} size={150} level={'H'} includeMargin={true} />
            <h4>Images</h4>
            <CRow>
              {gallery.map((item) => (
                <CCol
                  id={'gallery'}
                  className="mb-4"
                  data-id={item.id}
                  md={3}
                  key={item.id}
                  onClick={handleClick}
                >
                  <CCard>
                    <div className={'image-container'}>
                      <div className={'delete-image-btn'}>
                        <CIcon icon={cilTrash} size={'xxl'} />
                      </div>
                      <CCardImage
                        style={{ height: '150px', objectFit: 'contain' }}
                        orientation="top"
                        src={item.path}
                      />
                    </div>
                  </CCard>
                </CCol>
              ))}
            </CRow>
            <CCol md={12} className="mb-3">
              <CCol md={6} className="mb-3">
                <CFormLabel htmlFor="images">Images</CFormLabel>
                <CFormInput type="file" id="images" multiple={true} onChange={handleChange} />
              </CCol>
            </CCol>
            <h4>Information</h4>
            <CCol md={12} className="mb-3">
              <CFormLabel htmlFor="name">
                Name <span style={{ color: 'red' }}>(*)</span>
              </CFormLabel>
              <CFormInput
                invalid={invalidName.invalid}
                type="text"
                id="name"
                placeholder={'Please input name...'}
                value={name}
                onChange={handleChange}
              />
              <CFormFeedback invalid>
                <strong>{invalidName.msg}</strong>
              </CFormFeedback>
            </CCol>
            <CCol md={6} className="mb-3">
              <CFormLabel htmlFor="category">
                Category <span style={{ color: 'red' }}>(*)</span>
              </CFormLabel>
              {loading ? (
                <AppSpinner />
              ) : (
                <>
                  <CFormSelect
                    invalid={invalidCategory.invalid}
                    id={'category'}
                    aria-label="Default select example"
                    options={cateOpts}
                    value={category}
                    onChange={handleChange}
                  />
                  <CFormFeedback invalid>
                    <strong>{invalidCategory.msg}</strong>
                  </CFormFeedback>
                </>
              )}
            </CCol>
            <CCol md={6} className="mb-3">
              <CFormLabel htmlFor="is_active">
                Status <span style={{ color: 'red' }}>(*)</span>
              </CFormLabel>
              <CFormSelect
                invalid={invalidActive.invalid}
                id={'status'}
                aria-label="Default select example"
                options={activeOpts}
                value={status}
                onChange={handleChange}
              />
              <CFormFeedback invalid>
                <strong>{invalidActive.msg}</strong>
              </CFormFeedback>
            </CCol>
            <CCol md={12} className="mb-3">
              <CFormLabel htmlFor="location">Location</CFormLabel>
              <CFormInput
                type="text"
                id="location"
                placeholder={'Please input location...'}
                value={location}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={12} className="mb-3">
              <CFormLabel htmlFor="description">Description</CFormLabel>
              <CKEditor
                id={'description'}
                editor={ClassicEditor}
                data={description}
                onChange={(event, editor) => {
                  const data = editor.getData()
                  setDescription(data)
                }}
              />
            </CCol>
            <hr />
            <h4>Attributes</h4>
            <CCol md={6} className="mb-3">
              <CInputGroup>
                <CInputGroupText id="basic-addon1">Range</CInputGroupText>
                <CFormInput
                  id={'range'}
                  placeholder="Please input range"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  type="number"
                  value={range}
                  onChange={handleChange}
                />
                <CInputGroupText id="basic-addon1">kg</CInputGroupText>
              </CInputGroup>
            </CCol>
            <CCol md={6} className="mb-3">
              <CInputGroup>
                <CInputGroupText id="basic-addon1">Weight</CInputGroupText>
                <CFormInput
                  id={'weight'}
                  placeholder="Please input weight"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  type="number"
                  value={weight}
                  onChange={handleChange}
                />
                <CInputGroupText id="basic-addon1">kg</CInputGroupText>
              </CInputGroup>
            </CCol>
            <CCol md={6} className="mb-3">
              <CInputGroup>
                <CInputGroupText id="basic-addon1">Width</CInputGroupText>
                <CFormInput
                  id={'width'}
                  placeholder="Please input width"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  type="number"
                  value={width}
                  onChange={handleChange}
                />
                <CInputGroupText id="basic-addon1">cm</CInputGroupText>
              </CInputGroup>
            </CCol>
            <CCol md={6} className="mb-3">
              <CInputGroup>
                <CInputGroupText id="basic-addon1">Height</CInputGroupText>
                <CFormInput
                  id={'height'}
                  placeholder="Please input width"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  type="number"
                  value={height}
                  onChange={handleChange}
                />
                <CInputGroupText id="basic-addon1">cm</CInputGroupText>
              </CInputGroup>
            </CCol>
            <CCol md={6} className="mb-3">
              <CInputGroup>
                <CInputGroupText id="basic-addon1">Resolution</CInputGroupText>
                <CFormInput
                  id={'resolution'}
                  placeholder="Please input resolution"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  type="number"
                  value={resolution}
                  onChange={handleChange}
                />
                <CInputGroupText id="basic-addon1">kg</CInputGroupText>
              </CInputGroup>
            </CCol>
            <CCol xs={12}>
              <CButton onClick={handleSubmit}>Submit</CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default Create
