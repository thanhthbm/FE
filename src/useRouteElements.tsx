import React, { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ProductList from './pages/ProductList'
import { AuthContext } from './contexts/auth.context'
import { clearAccessTokenFromLS } from './utils/auth'
import Logout from './components/Logout/index'
import Verify from './pages/VerifyPage'
import Shop from './pages/Shop'
import MainLayout from './layouts/MainLayout'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AuthContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AuthContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      element: <RejectedRoute />,
      children: [
        {
          element: <AuthLayout />,
          children: [
            {
              path: 'login',
              element: <Login />
            },
            {
              path: 'register',
              element: <SignUp />
            },
            {
              path: 'verify',
              element: <Verify />
            }
          ]
        }
      ]
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              path: '/',
              element: <Shop />
            },
            {
              path: '/men',
              element: <ProductList categoryType={'men'} />
            },
            {
              path: '/women',
              element: <ProductList categoryType={'women'} />
            },
            {
              path: '/kids',
              element: <ProductList categoryType={'kids'} />
            },
            {
              path: '/logout',
              element: <Logout />
            }
          ]
        }
      ]
    }
  ])

  return routeElements
}
