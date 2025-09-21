import axios from "../../api/Config";
import { loadUser,logoutuser } from "../reducers/userSlicer";

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
