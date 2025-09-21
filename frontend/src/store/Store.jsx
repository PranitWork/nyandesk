
import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./reducers/userSlicer"


export const Store = configureStore({
    reducer:{
        userReduce: userSlice,
    },
});