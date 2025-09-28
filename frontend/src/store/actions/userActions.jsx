import axios from "../../api/Config";
import { loadJobs, loadUser,logoutuser, recommendJobs, searchJobs } from "../reducers/userSlicer";



export const checkAuth = async () => {
  try {
    const response = await axios.get("/auth/me", {
      withCredentials: true, // Important if you are using cookies
    });
    console.log(response)
    return response.data.user; // returns user data
  } catch (error) {
    return null; // not authenticated
  }
};


export const asyncCurrentUser = () => async (dispatch) => {
  try {
    const response = await axios.get("auth/current-user", {
      withCredentials: true,
    });
    if (response.data) {
      dispatch(loadUser(response.data.user));
      return { sucess: true, message: response.data.message };
    } else {
      console.log("No user data found");
      return { sucess: false, message: response.data.message };
    }
  } catch (err) {
    const backendMsg =
      err.response?.data?.message || err.response?.data?.msg || err.message;
    return { sucess: false, message: backendMsg };
  }
};

export const asyncregisterUser = (data) => async (dispatch) => {
  try {
    const response = await axios.post("auth/register", data, {
      withCredentials: true,
    });

    dispatch(asyncCurrentUser());
    return { sucess: true, message: response.data.message };
  } catch (err) {
    console.log(err)
    const backendMsg =
      err.response?.data?.message || err.response?.data?.msg || err.message;
    return { sucess: false, message: backendMsg };
  }
};

export const asyncloginUser = (data)=> async(dispatch)=>{
    try{
        const response = await axios.post("auth/login",data,{
            withCredentials:true,
        });
        if(response.data){
            dispatch(asyncCurrentUser());
            return {sucess: true, message: response.data.message};
        }else{
            return {sucess: false, message: response.data.message};
        }
    }catch(err){
        const backendMsg = err.response?.data?.message || err.response?.data?.msg || err.message;
    return { sucess: false, message: backendMsg };
    }
}

export const asynclogoutUser = ()=> async(dispatch)=>{
  try{
    const response = await axios.post("/auth/logout", {},{
      withCredentials: true
    });
    if(response.data){
      dispatch(logoutuser());
      return {sucess: true, message: response.data.message}
    }

  }catch(err){
    const backendMsg =
      err.response?.data?.message ||
      err.response?.data?.msg ||
      err.message;
    return { sucess: false, message: backendMsg };
  }
}



export const asyncUserProfileUpdate = (formData) => async (dispatch) => {
  try {
    const { data } = await axios.patch(
      "user/profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    dispatch(loadUser(data.user));

    return { sucess: true, message: data.message };
  } catch (error) {
    return {
      sucess: false,
      message:
        error.data?.message || "Error while updating profile",
    };
  }
};


export const asyncAtsChecker =(formData)=>async (dispatch)=>{
  try{
    const {data} = await axios.post("/resume/upload",formData,{
      headers:{
        "Content-Type": "multipart/form-data",
      },
      withCredentials:true,
    });
    dispatch(loadUser(data.user));
     return {
      success: true,
      data, 
    };
  }catch(err){
    return {
      sucess:false,
      message:err.data?.message || "cant upload the resume try agian",
    }
  }
}

export const asyncGetAllJobs = (page = 1, limit = 50) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/jobs/all?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });
    await dispatch(loadJobs(data)); // update redux state
    return {
      success: true,
      data: data.results,
      page: data.page,
      hasNextPage: data.hasNextPage,
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.msg || "No data found",
    };
  }
};

export const asyncRecommendJobs = (page = 1, limit = 50) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/jobs/recommend?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });
    await dispatch(recommendJobs(data));
    return {
      success: true,
      data: data.results,
      page: data.page,
      hasNextPage: data.hasNextPage,
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.error || "No data found",
    };
  }
};

export const asyncSearchjob = (formData, page = 1, limit = 50) => async (dispatch) => {
  try {
    const body = { ...formData, page, limit }; // include page & limit in body
    const { data } = await axios.post(`/jobs/search`, body, { withCredentials: true });

    dispatch(searchJobs(data));

    if (data?.results?.length > 0) {
      return {
        success: true,
        data: data.results,
        page: data.page,
        hasNextPage: data.hasNextPage,
      };
    } else {
      return {
        success: false,
        message: "No jobs found for this search",
      };
    }
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.msg || "Something went wrong while searching jobs",
    };
  }
};
