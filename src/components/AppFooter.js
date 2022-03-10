import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div className="ms-auto">
        Equipment Management System - Group 3<span className="ms-1">&copy; 2022s.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
