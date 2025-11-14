import React from 'react'
import AuthHeader from '../../components/AuthHeader'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div>
      <AuthHeader />
      <Outlet />
    </div>
  )
}

export default AuthLayout
