import { createContext, useState } from 'react'
import { getAccessTokenFromLS } from '../utils/auth'

interface IAuthContext {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

export const getInitialAuthContext: () => IAuthContext = () => ({
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null
})

const initalAuthContext = getInitialAuthContext()

export const AuthContext = createContext<IAuthContext>(initalAuthContext)

export const AuthProvider = ({
  children,
  defaultValue = initalAuthContext
}: {
  children: React.ReactNode
  defaultValue?: IAuthContext
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(defaultValue.isAuthenticated)

  const reset = () => {
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
