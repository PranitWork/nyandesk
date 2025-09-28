import { useEffect } from 'react'
import MainRoutes from './router/MainRoutes'
import { useDispatch } from 'react-redux'
import { asyncCurrentUser } from './store/actions/userActions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(asyncCurrentUser());

  },[])
  return (
    <>
      <MainRoutes/>
    </>
  )
}

export default App