import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full absolute flex justify-center py-4 z-50">
      <div className="bg-black w-[80%] rounded-full px-8 py-3 flex items-center justify-between space-x-8">
        <h1 className="text-white font-bold">Nyandesk</h1>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center space-x-6">
          <li>
            <NavLink to="/" className="text-white hover:text-gray-300">
              Home
            </NavLink>
          </li>
      
          <li>
            <NavLink to="/register" className="text-white hover:text-gray-300">
              Sign Up
            </NavLink>
          </li>
        </ul>

        {/* Hamburger */}
        <div className="md:hidden text-white text-2xl cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <FiX /> : <FiMenu />}
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-2/3 bg-black text-white transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out p-8 flex flex-col gap-6`}
        >
          <button className="self-end text-3xl" onClick={toggleMenu}>
            <FiX />
          </button>
          <NavLink to="/" className="hover:text-gray-300" onClick={toggleMenu}>
            Home
          </NavLink>
          <NavLink to="/features" className="hover:text-gray-300" onClick={toggleMenu}>
            Features
          </NavLink>
          <NavLink to="/pricing" className="hover:text-gray-300" onClick={toggleMenu}>
            Pricing
          </NavLink>
          <NavLink to="/contact" className="hover:text-gray-300" onClick={toggleMenu}>
            Contact
          </NavLink>
          <NavLink to="/register" className="hover:text-gray-300" onClick={toggleMenu}>
            Sign Up
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
