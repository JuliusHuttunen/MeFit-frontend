import { configureStore} from "@reduxjs/toolkit";
import basketReducer from './basketSlice'
import utilityReducer from './utilitySlice'
import databaseReducer from './databaseSlice'
import thunk from "redux-thunk";

export default configureStore({
    reducer: {
        basket: basketReducer,
        utility: utilityReducer,
        db: databaseReducer,
    },
    middleware: [thunk]
})