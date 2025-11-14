import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { useNavigate } from 'react-router-dom'
import { clearAccessTokenFromLS } from '../../utils/auth'

export default function Logout() {
  const { setIsAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    clearAccessTokenFromLS()
    setIsAuthenticated(false)
    navigate('/login')
  }, [navigate, setIsAuthenticated])

  return null
}
