import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-white flex justify-between items-center px-4 py-3 shadow-md">
      {/* Logo */}
      <div>
        <Link to="/">
          <h1 className="font-bold text-xl sm:text-2xl tracking-tighter">
            Nyan<span className="text-red-600">desk</span>
          </h1>
        </Link>
      </div>

      {/* User section */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Avatar */}
        <img
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-300 object-cover"
          src={null} // use a real avatar URL or null
          alt="User avatar"
        />

        {/* Greeting */}
        <p className="text-sm sm:text-base">
          Hey <span className="font-medium">Username</span> 👋😊
        </p>
      </div>
    </header>
  );
};

export default Header;
