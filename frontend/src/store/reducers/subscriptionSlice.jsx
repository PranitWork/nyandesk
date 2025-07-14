
import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    subscriptions:[],
};

const subscriptionSlice = createSlice({
    name:"subscription",
    initialState,
    reducers:{
        loadUser:(state,action)=>{
            state.subscriptions = action.payload;
        },
    },
});
export default subscriptionSlice.reducer;

export const {loadUser} = subscriptionSlice.actions;