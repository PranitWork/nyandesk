import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncloginUser } from "../store/actions/userActions";
import { toast } from "react-toastify";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const loginUser = async(data) => {
    if (data.email && data.password) {
      const response = await dispatch(asyncloginUser(data));
      console.log(response)
      if (response.sucess) {
        toast.success(response.message);
        navigate("/dashboard");
      } else {
        toast.error(response.message);
      }
    }else{
      toast.warn("Please fill in all fields");
    }
  };

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fde2e2] via-[#e2f0fd] to-[#f5e1fd] px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
        Nyandesk
      </h1>

      <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-lg flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <form onSubmit={handleSubmit(loginUser)} action="" method="POST">
          <input
            type="email"
            {...register("email")}
            placeholder="email"
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          />

          <button className="w-full cursor-pointer bg-black text-white py-3 rounded-md font-bold hover:bg-gray-900 transition">
            Submit
          </button>

          <p className="mt-4 text-sm text-gray-600">
            I Don’t Have An Account.{" "}
            <a href="/register" className="text-black cursor-pointer font-medium underline">
              Signup
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
