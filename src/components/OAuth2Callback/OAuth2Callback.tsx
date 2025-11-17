import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { setAccessTokenToLs } from '../../utils/auth'
import { AuthContext } from '../../contexts/auth.context'

const OAuth2Callback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setIsAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      setAccessTokenToLs(token)
      navigate('/')
      setIsAuthenticated(true)
    } else {
      navigate('/login')
    }
  }, [searchParams, navigate])

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <p className='text-gray-600'>Logging you in...</p>
    </div>
  )
}

export default OAuth2Callback
