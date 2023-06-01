import React from 'react'
import { Navigate } from 'react-router-dom'
import logout from 'utils/logoff'

const LogoffRoute: React.FC = () => {
  logout()
  return <Navigate to={'/'} replace={true}></Navigate>
}

export default LogoffRoute
