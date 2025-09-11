const Register = () => {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fde2e2] via-[#e2f0fd] to-[#f5e1fd] px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
        Nyandesk
      </h1>

      <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-lg flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-6">Register</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        <button className="w-full bg-black text-white py-3 rounded-md font-bold hover:bg-gray-900 transition">
          Submit
        </button>

        <p className="mt-4 text-sm text-gray-600">
          I have Already Account.{" "}
          <a href="/login" className="text-black font-medium underline">
            Login
          </a>
        </p>
      </div>
    </section>
  );
};

export default Register;
