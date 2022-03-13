import { configureStore } from '@reduxjs/toolkit'
import changeStateReducer from './redux/reducers/changeStateReducer'
import { authReducer } from './redux/reducers/authReducer'
import { categoryReducer } from './redux/reducers/categoryReducer'
import { maintainerReducer } from './redux/reducers/maintainerReducer'
import { equipmentReducer } from './redux/reducers/equipmentReducer'
import { alertReducer } from './redux/reducers/alertReducer'
import { maintenanceReducer } from './redux/reducers/maintenanceReducer'

const store = configureStore({
  reducer: {
    changeState: changeStateReducer,
    alert: alertReducer.reducer,
    auth: authReducer.reducer,
    category: categoryReducer.reducer,
    maintainer: maintainerReducer.reducer,
    equipment: equipmentReducer.reducer,
    maintenance: maintenanceReducer.reducer,
  },
})

export default store
