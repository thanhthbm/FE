import React from 'react'
import AuthHeader from '../../components/AuthHeader'

interface Props {
  children?: React.ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div>
      <AuthHeader />
      {children}
    </div>
  )
}

export default AuthLayout
