export const activeOptions = () => [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
]
export const sizePageOptions = () => [
  { label: '5 items', value: '5' },
  { label: '10 items', value: '10' },
  { label: '15 items', value: '15' },
]

// auth
export const accessToken = (state) => state.auth.data.token

// categories
export const categories = (state) => state.category.list
export const currentCate = (state) => state.category.currentCate

// maintainers
export const currentMaintainer = (state) => state.maintainer.currentMaintainer

// equipments
export const currentEquipment = (state) => state.equipment.currentEquipment
export const exportData = (state) => state.equipment.exportData

// maintainers
export const currentMaintenance = (state) => state.maintenance.currentMaintenance
