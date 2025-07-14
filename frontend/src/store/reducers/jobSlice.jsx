
import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    jobs:[],
};

const jobSlice = createSlice({
    name:"job",
    initialState,
    reducers:{
        loadUser:(state,action)=>{
            state.jobs = action.payload;
        },
    },
});
export default jobSlice.reducer;

export const {loadUser} = jobSlice.actions;