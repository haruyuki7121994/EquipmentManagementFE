import { configureStore } from '@reduxjs/toolkit'
import changeStateReducer from './redux/reducers/changeStateReducer'
import { loginReducer } from './redux/reducers/loginReducer'
import { categoryReducer } from './redux/reducers/categoryReducer'
import { maintainerReducer } from './redux/reducers/maintainerReducer'
import { equipmentReducer } from './redux/reducers/equipmentReducer'
import { alertReducer } from './redux/reducers/alertReducer'
import { maintenanceReducer } from './redux/reducers/maintenanceReducer'

const store = configureStore({
  reducer: {
    changeState: changeStateReducer,
    alert: alertReducer.reducer,
    auth: loginReducer.reducer,
    category: categoryReducer.reducer,
    maintainer: maintainerReducer.reducer,
    equipment: equipmentReducer.reducer,
    maintenance: maintenanceReducer.reducer,
  },
})

export default store
