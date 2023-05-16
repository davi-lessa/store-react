import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from 'store'

const PrivateRoutes = () => {
  const isLogged = useSelector((current: RootState) => current.auth.isLogged)

  return isLogged ? <Outlet /> : <Navigate to={'/login'} replace={true} />
}

export default PrivateRoutes
