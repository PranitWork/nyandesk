
import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    chats:[],
};

const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers:{
        loadUser:(state,action)=>{
            state.chats = action.payload;
        },
    },
});
export default chatSlice.reducer;

export const {loadUser} = chatSlice.actions;