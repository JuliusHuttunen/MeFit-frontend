import { configureStore } from "@reduxjs/toolkit";
import basketReducer from './basketSlice'
import utilityReducer from './utilitySlice'

export default configureStore({
    reducer: {
        basket: basketReducer,
        utility: utilityReducer
    },
})