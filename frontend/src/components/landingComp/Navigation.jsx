import {NavLink} from "react-router-dom"
const Navigation = () => {
  return (
      <nav className="w-full flex justify-center py-4">
      <div className="bg-black rounded-full px-8 py-3 flex items-center space-x-8">
        <h1 className="text-white font-bold">Nyandesk</h1>
        <ul className="flex items-center space-x-6">
          <li><NavLink to="/" className="text-white hover:text-gray-300">Home</NavLink></li>
          <li><NavLink to="/features" className="text-white hover:text-gray-300">Features</NavLink></li>
          <li><NavLink to="/pricing" className="text-white hover:text-gray-300">Pricing</NavLink></li>
          <li><NavLink to="/contact" className="text-white hover:text-gray-300">Contact</NavLink></li>
          <li><NavLink to="/signup" className="text-white hover:text-gray-300">Sign Up</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation