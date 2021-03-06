import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
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
import { activeOptions } from '../../redux/selectors'
import { EQUIPMENT_VALIDATOR } from '../../validator'
import CIcon from '@coreui/icons-react'
import { cilInfo } from '@coreui/icons'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const Create = () => {
  const validator = EQUIPMENT_VALIDATOR
  const [invalidName, setInvalidName] = useState({ invalid: false, msg: '' })
  const [invalidActive, setInvalidActive] = useState({ invalid: false, msg: '' })
  const [invalidCategory, setInvalidCategory] = useState({ invalid: false, msg: '' })
  const [invalidQrcode, setInvalidQrcode] = useState({ invalid: false, msg: '' })
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [qrcode, setQrcode] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  let [images, setImages] = useState(null)
  const [range, setRange] = useState('0')
  const [weight, setWeight] = useState('0')
  const [width, setWidth] = useState('0')
  const [height, setHeight] = useState('0')
  const [resolution, setResolution] = useState('0')
  const [status, setStatus] = useState('active')
  const [cateOpts, setCateOpts] = useState([])
  const activeOpts = useSelector(activeOptions)
  const navigate = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    let cateOptions = [{ label: 'Select Category', value: '' }]
    let data = {
      params: {
        page: 0,
        size: 500,
        active: 1,
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
  }, [dispatch])

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
      case 'qrcode':
        setQrcode(e.currentTarget.value)
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
    console.log(qrcode.length)
    if (name.length === 0 || status.length === 0 || category.length === 0 || qrcode.length > 20) {
      if (category.length === 0) {
        setInvalidCategory({ invalid: true, msg: validator.category.required })
      } else setInvalidCategory({ invalid: false, msg: '' })
      if (name.length === 0) {
        setInvalidName({ invalid: true, msg: validator.name.required })
      } else setInvalidName({ invalid: false, msg: '' })
      if (status.length === 0) {
        setInvalidActive({ invalid: true, msg: validator.active.required })
      } else setInvalidActive({ invalid: false, msg: '' })
      if (qrcode.length > 20) {
        setInvalidQrcode({ invalid: true, msg: validator.qrcode.max })
      } else setInvalidQrcode({ invalid: false, msg: '' })
      return
    }

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    }
    let formData = new FormData()
    formData.append('name', name)
    formData.append('qrcode', qrcode)
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
    EquipmentService.create(formData, config).then((r) => {
      const data = r.data
      if (data.status === STATUS_CODE.SUCCESS) {
        dispatch(alertReducer.actions.set(AlertService.getPayload('Create Successful!')))
        navigate.push('/equipments/list')
      }
    })
  }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Create new Equipment</strong>
        </CCardHeader>
        <CCardBody>
          <CForm className="row g-2">
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
                Active <span style={{ color: 'red' }}>(*)</span>
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
              <CFormLabel htmlFor="qrcode">Qrcode</CFormLabel>
              <CAlert color="primary">
                <CIcon icon={cilInfo} className="flex-shrink-0 me-2" width={24} height={24} />
                If you do not enter the Qrcode, The Qrcode will be automatically generated by the
                system !
              </CAlert>
              <CFormInput
                invalid={invalidQrcode.invalid}
                type="text"
                id="qrcode"
                placeholder={'Please input qrcode...'}
                value={qrcode}
                onChange={handleChange}
              />
              <CFormFeedback invalid>
                <strong>{invalidQrcode.msg}</strong>
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
              <CFormLabel htmlFor="images">Images</CFormLabel>
              <CFormInput type="file" id="images" multiple={true} onChange={handleChange} />
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
