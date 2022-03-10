const HOST = 'http://localhost:8080/api'
const API = {
  LOGIN: '/auth/login',
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
  },
  MAINTENANCE: {
    LIST: '/maintenances/all',
    CREATE: '/maintenances/create',
    ADD_EQUIPMENTS: '/maintenances/:id/add-equipments',
    FIND: '/maintenances/:id',
    UPDATE: '/maintenances/:id',
    DELETE: '/maintenances/:id',
    NOTIFICATION: '/notifications/create',
  },
}

const STATUS_CODE = {
  SUCCESS: 200,
  ERROR: 500,
  BAD_REQUEST: 400,
  CONFLICT: 409,
}

export { API, STATUS_CODE, HOST }
