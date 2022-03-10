const getPayload = (message) => {
  const payload = {
    id: Math.random() * 10,
    visible: true,
    color: '',
    message: message,
  }

  if (message.toLowerCase().search('success') > 0) {
    payload.color = 'success'
  } else if (message.toLowerCase().search('fail') > 0) {
    payload.color = 'danger'
  } else {
    payload.color = 'info'
  }

  if (message === 'invisible') {
    payload.visible = false
    payload.message = ''
  }

  return payload
}
const AlertService = {
  getPayload,
}
export default AlertService
