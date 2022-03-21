import { configureStore} from "@reduxjs/toolkit";
import basketReducer from './basketSlice'
import databaseReducer from './databaseSlice'
import profileReducer from './profileSlice'
import thunk from "redux-thunk";

export default configureStore({
    reducer: {
        basket: basketReducer,
        db: databaseReducer,
        profile: profileReducer,
    },
    middleware: [thunk]
})