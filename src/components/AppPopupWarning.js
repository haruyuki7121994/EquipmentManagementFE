import {
  CButton,
  CContainer,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import PropTypes from 'prop-types'
import React from 'react'

export const AppPopupWarning = ({ visible, handleDeleteTrue, handleDeleteFalse }) => {
  return (
    <CContainer>
      <CModal visible={visible} onClose={handleDeleteFalse}>
        <CModalHeader>
          <CModalTitle>Warning Popup!</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ background: '#e55353' }}>
          <strong>Do you really want delete this record ?</strong>
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" style={{ color: 'white' }} onClick={handleDeleteTrue}>
            Yes
          </CButton>
          <CButton color="info" style={{ color: 'white' }} onClick={handleDeleteFalse}>
            No
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  )
}

AppPopupWarning.propTypes = {
  handleDeleteTrue: PropTypes.func,
  handleDeleteFalse: PropTypes.func,
  visible: PropTypes.bool,
}
