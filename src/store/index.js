import { configureStore } from "@reduxjs/toolkit"
import logger from 'redux-logger'
import scheduleReducer from "./reducers/schedule"
import adminReducer from "./reducers/admin"

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(logger),
    reducer: {
        user: adminReducer,
        schedule: scheduleReducer
    }
})

export default store