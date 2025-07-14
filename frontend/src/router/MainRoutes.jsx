
import { Route, Routes } from 'react-router-dom'

import Landing from "../pages/landingpage/Landing";
import Pricing from "../pages/landingpage/Pricing";
import Login from "../pages/Login"
import Register from '../pages/Register';
import Dashboard from '../pages/dashboard/Dashboard';

const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/pricing' element={<Pricing/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
  )
}

export default MainRoutes