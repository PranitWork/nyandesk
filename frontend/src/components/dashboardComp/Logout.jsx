import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { asynclogoutUser } from '../../store/actions/userActions';
import { toast } from 'react-toastify';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate();
    const userDetails = useSelector((state)=>state.userReducer.users);

 const userLogOut = async () => {
  const response = await dispatch(asynclogoutUser());
  if (response.success) {
    toast.success("User logged out");
    navigate("/login");
  } else {
    toast.error(response.message || "Logout failed");
  }
};

  const userNavigate = ()=>{
    navigate("/dashboard");
  }
  return (
    
     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <img
            src={userDetails.profilePic}
            alt="User Profile"
            className="w-24 h-24 rounded-full border-4 border-gray-200 shadow-md"
          />
          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            {userDetails.name}
          </h2>
        </div>

        {/* Logout Confirmation Box */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl shadow-inner">
          <p className="text-gray-700 font-medium">
            Do you really want to logout?
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <button onClick={userLogOut} className="px-5 py-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition">
              Yes
            </button>
            <button onClick={userNavigate} className="px-5 py-2 cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg shadow transition">
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Logout