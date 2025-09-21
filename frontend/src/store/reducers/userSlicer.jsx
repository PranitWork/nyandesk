
import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    users:[],
};

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        loadUser:(state,action)=>{
            state.users = action.payload;
        },
         logoutuser: (state,action)=>{
             state.users =null;
        },
        
    },
});
export default userSlice.reducer;

export const {loadUser,logoutuser} = userSlice.actions;