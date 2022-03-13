import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CCarousel,
  CCarouselItem,
  CCol,
  CImage,
  CLink,
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode.react'
import { useDispatch, useSelector } from 'react-redux'
import { currentEquipment } from '../../redux/selectors'
import { useHistory } from 'react-router-dom'
import { STATUS_CODE } from '../../api'
import CookieService from '../../services/CookieService'
import EquipmentService from '../../services/EquipmentService'
import { equipmentReducer } from '../../redux/reducers/equipmentReducer'

const Detail = () => {
  const [gallery, setGallery] = useState([])
  const equipment = useSelector(currentEquipment)
  const navigate = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (Object.keys(equipment).length === 0) {
      const id = CookieService.get('equipment_id')
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
      setGallery(equipment.images)
    }
  }, [dispatch, equipment])

  const handleClickUpdateBtn = (e) => {
    navigate.push('/equipments/edit')
  }

  const handleClickUsername = (e) => {
    CookieService.save('maintainer_id', e.currentTarget.id)
    navigate.push('/maintainers/detail')
    console.log(e.currentTarget.id)
  }
  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Scale Details</strong>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol md={3} />
            <CCol md={6}>
              {gallery.length > 0 ? (
                <>
                  <CCarousel controls indicators dark>
                    {gallery.map((image) => (
                      <CCarouselItem key={image.id}>
                        <CImage
                          style={{ height: '450px', objectFit: 'contain' }}
                          className="d-block image-center"
                          src={image.path}
                          alt="slide 1"
                        />
                      </CCarouselItem>
                    ))}
                  </CCarousel>
                </>
              ) : null}
            </CCol>
            <CCol md={3} />
          </CRow>
          <br />
          <CCard>
            <CCardHeader>General</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md={6}>
                  <QRCode
                    id="qrcode"
                    value={equipment.qrcode !== undefined ? equipment.qrcode : 'abc'}
                    size={150}
                    level={'H'}
                    includeMargin={true}
                  />
                  <p>
                    <strong>{equipment.qrcode}</strong>
                  </p>
                  <CCardTitle>{equipment.name}</CCardTitle>
                  <CCardSubtitle className="mb-2 text-medium-emphasis">
                    {equipment.category !== undefined ? equipment.category.name : ''}
                  </CCardSubtitle>
                  <CButton className="m-1" onClick={handleClickUpdateBtn}>
                    Update
                  </CButton>
                  {/*<CButton className="m-1" color={'success'} href="#">*/}
                  {/*  Maintenance*/}
                  {/*</CButton>*/}
                </CCol>
                <CCol md={6}>
                  <h4>Information</h4>
                  <br />
                  <CCardText>Status: {equipment.status === 1 ? 'Active' : 'Inactive'}</CCardText>
                  <CCardText>Range: {equipment.range}kg</CCardText>
                  <CCardText>
                    Size: {equipment.width}cmx{equipment.height}cm
                  </CCardText>
                  <CCardText>Weight: {equipment.weight}kg</CCardText>
                  <CCardText>Resolution: {equipment.resolution}kg</CCardText>
                  <CCardText>Location: {equipment.location}</CCardText>
                  <CCardText>Created At: {equipment.createdAt}</CCardText>
                </CCol>
              </CRow>
              <br />
              <CRow>
                <h4>Description</h4>
                <br />
                <CCardText dangerouslySetInnerHTML={{ __html: equipment.description }} />
              </CRow>
            </CCardBody>
          </CCard>
          <br />
          <CCard>
            <CCardHeader>Comments</CCardHeader>
            <CCardBody>
              {equipment.comments !== undefined &&
              equipment.comments !== null &&
              equipment.comments.length > 0 ? (
                equipment.comments.map((item) => (
                  <CCard key={item.id} className="text-center">
                    <CCardBody>
                      <CCardText>
                        <CLink id={item.user.id} onClick={handleClickUsername}>
                          {item.user.username}
                        </CLink>{' '}
                        <p>{item.createdAt}</p>
                      </CCardText>
                      <CCardText dangerouslySetInnerHTML={{ __html: item.description }} />
                    </CCardBody>
                  </CCard>
                ))
              ) : (
                <p className="text-center">No comments</p>
              )}
            </CCardBody>
          </CCard>
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default Detail
