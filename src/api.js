const HOST = 'http://localhost:8080/api'
const API = {
  REPORT: {
    LIST: '/report/all',
  },
  AUTH: {
    LOGIN: '/auth/login',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/edit/password',
    CHANGE_EMAIL: '/auth/edit/email',
    SEND_FORGOT_PASSWORD: '/auth/forgot-password/send',
    VERIFY_FORGOT_PASSWORD: '/auth/forgot-password/verify',
  },
  CATEGORY: {
    LIST: '/categories/all',
    CREATE: '/categories/create',
    FIND: '/categories/:id',
    UPDATE: '/categories/:id',
    DELETE: '/categories/:id',
  },
  USER: {
    LIST: '/users/all',
    CREATE: '/users/create',
    FIND: '/users/:id',
    UPDATE: '/users/:id',
    DELETE: '/users/:id',
  },
  EQUIPMENT: {
    LIST: '/equipments/all',
    CREATE: '/equipments/create',
    BULK_CREATE: '/equipments/bulk-create',
    FIND: '/equipments/qrcode/:id',
    UPDATE: '/equipments/:id',
    DELETE: '/equipments/:id',
    DELETE_IMAGE: '/storage/:id',
    CHECK_QRCODE: '/equipments/qrcode/check',
    LOG: '/logs/all',
    ROLLBACK: '/logs/rollback/:id',
  },
  MAINTENANCE: {
    LIST: '/maintenances/all',
    CREATE: '/maintenances/create',
    ADD_EQUIPMENTS: '/maintenances/:id/add-equipments',
    REMOVE_EQUIPMENTS: '/maintenances/:id/remove-equipments',
    FIND: '/maintenances/:id',
    UPDATE: '/maintenances/:id',
    DELETE: '/maintenances/:id',
    NOTIFICATION: '/notifications/create',
  },
  COMMENT: {
    LIST: '/comments/all',
  },
}

const STATUS_CODE = {
  SUCCESS: 200,
  ERROR: 500,
  BAD_REQUEST: 400,
  CONFLICT: 409,
  UNAUTHORIZED: 401,
}

export { API, STATUS_CODE, HOST }
