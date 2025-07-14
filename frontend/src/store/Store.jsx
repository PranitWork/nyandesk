
import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./reducers/userSlicer"
import jobSlice from "./reducers/jobSlice"
import chatSlice from "./reducers/chatSlice"
import subscriptionSlice from "./reducers/subscriptionSlice"

export const Store = configureStore({
    reducer:{
        userReduce: userSlice,
        jobReducer: jobSlice,
        ChatReducer: chatSlice, 
        subscriptionReducer: subscriptionSlice,
    },
});