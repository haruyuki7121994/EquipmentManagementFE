import React, { lazy, useEffect, useState } from 'react'

import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
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
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'

import avatar from 'src/assets/images/avatars/maintainer_avatar.jpg'
import DashboardService from '../../services/DashboardService'
import CommentService from '../../services/CommentService'
import { AppPagination } from '../../components/AppPagination'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))

const Dashboard = () => {
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)
  const [metadata, setMetadata] = useState({})
  const [comments, setComments] = useState([])

  const [report, setReport] = useState({
    called: false,
    maintainers: 0,
    categories: 0,
    equipments: 0,
    maintenances: 0,
  })
  useEffect(() => {
    if (!report.called) {
      DashboardService.getAll()
        .then((res) => {
          const data = res.data
          console.log(data)
          setReport({
            called: true,
            maintainers: data.data.maintainers,
            categories: data.data.categories,
            equipments: data.data.equipments,
            maintenances: data.data.maintenances,
          })
        })
        .catch((res) => {
          const data = res.response
          console.log(data)
        })
    }

    if (comments.length === 0 || page || size) {
      const data = {
        params: {
          page: page,
          size: size,
          date: 'this-week',
        },
      }
      CommentService.getAll(data)
        .then((res) => {
          setComments(res.data.data.comments)
          setMetadata(res.data.metadata)
        })
        .catch((res) => {
          console.log(res.response)
        })
    }
  }, [comments.length, page, report.called, size])

  return (
    <>
      <WidgetsDropdown data={report} />

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>This Week Traffic</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-3 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>Maintainer</CTableHeaderCell>
                    <CTableHeaderCell>Equipment</CTableHeaderCell>
                    <CTableHeaderCell>Comment</CTableHeaderCell>
                    <CTableHeaderCell>Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {comments.length > 0 ? (
                    comments.map((item) => (
                      <CTableRow key={item.id}>
                        <CTableDataCell className="text-center">
                          <CAvatar size="md" src={avatar} />
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item.user.username}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CLink href="/">{item.equipment.name}</CLink>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CCardText dangerouslySetInnerHTML={{ __html: item.description }} />
                        </CTableDataCell>
                        <CTableDataCell>
                          <div className="small text-medium-emphasis">Last comment</div>
                          <strong>{item.createdAt}</strong>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <>
                      <CTableRow>
                        <CTableDataCell className="text-center">No data</CTableDataCell>
                      </CTableRow>
                    </>
                  )}
                </CTableBody>
              </CTable>
              <AppPagination
                metadata={metadata}
                onSizeChange={(e) => setPage(parseInt(e.currentTarget.value))}
                onPageChange={(e) => setSize(parseInt(e.currentTarget.id))}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
