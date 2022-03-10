const CATEGORY_VALIDATOR = {
  name: {
    409: 'Name is existed!',
    required: 'Name is required!',
  },
  active: {
    required: 'Active is required!',
  },
}

const EQUIPMENT_VALIDATOR = {
  name: {
    required: 'Name is required!',
  },
  category: {
    required: 'Category is required!',
  },
  active: {
    required: 'Active is required!',
  },
  quantity: {
    min: 'Min quantity is 1',
    max: 'Max quantity is 300',
  },
  qrcodeList: {
    notEnough: 'Qrcode list is not enough compared to the quantity',
    excess: 'Qrcode list is excess compared to the quantity',
  },
}

const MAINTENANCE_VALIDATOR = {
  date: {
    required: 'Date is required!',
  },
  maintainer: {
    required: 'Maintainer is required!',
  },
}

const MAINTAINER_VALIDATOR = {
  email: {
    required: 'Email is required!',
    409: 'Email is existed!',
  },
  username: {
    required: 'Username is required!',
    409: 'Username is existed!',
  },
  password: {
    required: 'Password is required!',
  },
  phone: {
    required: 'Phone Number is required!',
  },
}

export { CATEGORY_VALIDATOR, EQUIPMENT_VALIDATOR, MAINTENANCE_VALIDATOR, MAINTAINER_VALIDATOR }
