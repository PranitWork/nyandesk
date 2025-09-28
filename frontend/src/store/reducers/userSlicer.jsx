
import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    users:[],
    jobs:[],
    recommendJobs:[],
    searchJobs:[],
    
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

        loadJobs:(state,action)=>{
            state.jobs = action.payload;
        },
        recommendJobs:(state,action)=>{
            state.recommendJobs = action.payload
        },
        searchJobs:(state,action)=>{
            state.searchJobs= action.payload;
        }
    },
});
export default userSlice.reducer;

export const {loadUser,logoutuser,loadJobs,recommendJobs,searchJobs} = userSlice.actions;