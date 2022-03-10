import { CCol, CFormSelect, CInputGroup, CPagination, CPaginationItem, CRow } from '@coreui/react'
import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { sizePageOptions } from '../redux/selectors'
import { DOTS, usePagination } from '../common/usePagination'

export const AppPagination = ({ metadata, onSizeChange, onPageChange }) => {
  const sizePageOpts = useSelector(sizePageOptions)
  let paginationRange = usePagination({
    currentPage: metadata.currentPage,
    totalCount: metadata.totalItems,
    siblingCount: 1,
    pageSize: metadata.size,
  })
  if (paginationRange === undefined) paginationRange = []
  return (
    <CRow>
      <CCol xs={12} sm={4}>
        <CPagination aria-label="Page navigation example">
          <CPaginationItem
            id={metadata.currentPage - 1}
            disabled={metadata.currentPage === 0}
            onClick={onPageChange}
          >
            Previous
          </CPaginationItem>
          {paginationRange.map((pageNumber) => {
            if (pageNumber === DOTS) {
              return <CPaginationItem>&#8230;</CPaginationItem>
            }
            return (
              <CPaginationItem
                className={pageNumber - 1 === metadata.currentPage ? 'selected-page' : ''}
                id={pageNumber - 1}
                key={pageNumber}
                onClick={onPageChange}
              >
                {pageNumber}
              </CPaginationItem>
            )
          })}
          <CPaginationItem
            id={metadata.currentPage + 1}
            disabled={metadata.currentPage + 1 === metadata.totalPages}
            onClick={onPageChange}
          >
            Next
          </CPaginationItem>
        </CPagination>
      </CCol>
      <CCol xs={6} sm={6} />
      <CCol xs={12} sm={2}>
        <CInputGroup className="mb-3">
          <CFormSelect
            id="inputGroupSelect01"
            options={sizePageOpts}
            value={metadata.size}
            onChange={onSizeChange}
          />
        </CInputGroup>
      </CCol>
    </CRow>
  )
}

AppPagination.propTypes = {
  metadata: PropTypes.objectOf(PropTypes.any).isRequired,
  onSizeChange: PropTypes.func,
  onPageChange: PropTypes.func,
}
