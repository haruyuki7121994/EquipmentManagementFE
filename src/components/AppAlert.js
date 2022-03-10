import CIcon from '@coreui/icons-react'
import { cilBurn, cilCheckCircle, cilInfo, cilWarning } from '@coreui/icons'
import { CAlert } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { alertReducer } from '../redux/reducers/alertReducer'
import AlertService from '../services/AlertService'

export const AppAlert = () => {
  const [color, setColor] = useState('success')
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')
  const alert = useSelector((state) => state.alert)
  const dispatch = useDispatch()
  useEffect(() => {
    setColor(alert.color)
    setVisible(alert.visible)
    setMessage(alert.message)
    if (alert.visible === true) {
      setTimeout(() => {
        dispatch(alertReducer.actions.set(AlertService.getPayload('invisible')))
      }, 3000)
    }
  }, [alert, dispatch])
  return (
    <CAlert
      visible={visible}
      color={color}
      className={visible ? 'd-flex align-items-center fadeIn' : 'd-flex align-items-center fadeOut'}
    >
      <CIcon
        icon={
          color === 'success'
            ? cilCheckCircle
            : color === 'danger'
            ? cilWarning
            : color === 'info'
            ? cilInfo
            : cilBurn
        }
        className="flex-shrink-0 me-2"
        width={24}
        height={24}
      />
      <div>{message}</div>
    </CAlert>
  )
}
