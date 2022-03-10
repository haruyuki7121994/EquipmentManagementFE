import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CLink,
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
import QRCode from 'qrcode.react'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
} from '@coreui/icons'
import avatar6 from '../../assets/images/avatars/6.jpg'

const Detail = () => {
  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'SCALE110001',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'SCALE110002',
        new: false,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'SCALE110003', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'SCALE110004', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'SCALE110005',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'SCALE110006',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'SCALE110007', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]
  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Maintainer Details</strong>
        </CCardHeader>
        <CCardBody>
          <CCard>
            <CCardHeader>General</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md={6}>
                  <CTableHeaderCell scope="row">
                    <CAvatar size="xl" src={avatar1} />
                  </CTableHeaderCell>
                  <CCardTitle>Admin1</CCardTitle>
                  <CButton href="#">Update</CButton>
                </CCol>
                <CCol md={6}>
                  <h4>Information</h4>
                  <br />
                  <CCardText>Email: admin1@gmail.com</CCardText>
                  <CCardText>Phone number: 0338330044</CCardText>
                  <CCardText>Address: 30 CMT8, Tan Binh District, HCM City</CCardText>
                  <CCardText>Active: Yes</CCardText>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
          <br />
          <CCard>
            <CCardHeader>Comments</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>QrCode</CTableHeaderCell>
                    <CTableHeaderCell>Equipment</CTableHeaderCell>
                    <CTableHeaderCell>Comment</CTableHeaderCell>
                    <CTableHeaderCell>Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <QRCode
                          id="qrcode"
                          value={item.user.name}
                          size={50}
                          level={'H'}
                          includeMargin={true}
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <CLink href="/">Body Scale</CLink>
                      </CTableDataCell>
                      <CTableDataCell>
                        It is a long established fact that a reader ...
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-medium-emphasis">Last comment</div>
                        <strong>{item.activity}</strong>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
          <br />
          <CCard>
            <CCardHeader>Maintenances</CCardHeader>
            <CCardBody>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Total equipment</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Repeated Type</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow className={'middle-vertical'}>
                    <CTableDataCell>5</CTableDataCell>
                    <CTableDataCell>2022/03/25</CTableDataCell>
                    <CTableDataCell>3</CTableDataCell>
                    <CTableDataCell>Pending</CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                  </CTableRow>
                  <CTableRow className={'middle-vertical'}>
                    <CTableDataCell>4</CTableDataCell>
                    <CTableDataCell>2022/02/22</CTableDataCell>
                    <CTableDataCell>20</CTableDataCell>
                    <CTableDataCell>Pending</CTableDataCell>
                    <CTableDataCell>Every year</CTableDataCell>
                  </CTableRow>
                  <CTableRow className={'middle-vertical'}>
                    <CTableDataCell>3</CTableDataCell>
                    <CTableDataCell>2022/02/20</CTableDataCell>
                    <CTableDataCell>15</CTableDataCell>
                    <CTableDataCell>Pending</CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                  </CTableRow>
                  <CTableRow className={'middle-vertical'}>
                    <CTableDataCell>2</CTableDataCell>
                    <CTableDataCell>2022/02/18</CTableDataCell>
                    <CTableDataCell>3</CTableDataCell>
                    <CTableDataCell>Notified</CTableDataCell>
                    <CTableDataCell>Every month</CTableDataCell>
                  </CTableRow>
                  <CTableRow className={'middle-vertical'}>
                    <CTableDataCell>1</CTableDataCell>
                    <CTableDataCell>2021/02/22</CTableDataCell>
                    <CTableDataCell>5</CTableDataCell>
                    <CTableDataCell>Completed</CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default Detail
