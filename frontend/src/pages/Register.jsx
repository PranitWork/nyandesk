import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { asyncregisterUser } from "../store/actions/userActions";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
const navigate = useNavigate();

    const registerUser = async (data) => {
    if (data.name && data.username && data.email && data.password) {
      const res = await dispatch(asyncregisterUser(data));
      console.log(res);
      if (res.sucess) {
        toast.success(res.message || "Registration successful!");
        navigate("/dashboard"); 
      } else {
        toast.error(res.message || "Something went wrong");
      }
      
    } else {
      toast.warn("Please fill in all fields");
    }
  };
    return (
      <section className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fde2e2] via-[#e2f0fd] to-[#f5e1fd] px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
          Nyandesk
        </h1>

        <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-6">Register</h2>
          <form method="POST" onSubmit={handleSubmit(registerUser)}>
            <input
              type="text"
              {...register("name")}
              placeholder="Name"
              className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <input
              type="text"
              {...register("username")}
              placeholder="Username"
              className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md font-bold hover:bg-gray-900 transition"
            >
              Submit
            </button>

            <p className="mt-4 text-sm text-gray-600">
              I have Already Account.{" "}
              <a href="/login" className="text-black font-medium underline">
                Login
              </a>
            </p>
          </form>
        </div>
      </section>
    );
  };

export default Register;
