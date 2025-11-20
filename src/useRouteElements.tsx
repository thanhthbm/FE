import React, { useContext } from 'react'
import { Navigate, Outlet, useRoutes, useLocation } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ProductList from './pages/ProductList'
import { AuthContext } from './contexts/auth.context'
import Logout from './components/Logout'
import Verify from './pages/VerifyPage'
import Shop from './pages/Shop'
import MainLayout from './layouts/MainLayout'
import ProductDetail from './pages/ProductDetail'
import NotFound from './pages/NotFound'
import OAuth2Callback from './components/OAuth2Callback'
import Cart from './pages/Cart'
import WishList from './pages/WishList'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AuthContext)
  const location = useLocation()

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' replace state={{ from: location }} />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AuthContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' replace />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      element: <RejectedRoute />,
      children: [
        {
          element: <AuthLayout />,
          children: [
            { path: 'login', element: <Login /> },
            { path: 'register', element: <SignUp /> },
            { path: 'verify', element: <Verify /> }
          ]
        },
        {
          element: <OAuth2Callback />,
          path: 'oauth2/callback'
        }
      ]
    },

    {
      element: <ProtectedRoute />,
      children: [
        {
          element: <MainLayout />,
          children: [
            { index: true, element: <Shop /> },

            { path: 'men', element: <ProductList category={'men'} /> },
            { path: 'women', element: <ProductList category={'women'} /> },
            { path: 'kids', element: <ProductList category={'kids'} /> },

            {
              path: 'product',
              children: [
                { index: true, element: <Navigate to='/' replace /> },

                { path: ':productId', element: <ProductDetail /> }
              ]
            },
            {
              path: 'cart',
              element: <Cart />
            },
            {
              path: 'wishlist',
              element: <WishList />
            },

            { path: 'logout', element: <Logout /> },

            { path: '*', element: <NotFound /> }
          ]
        }
      ]
    }
  ])

  return routeElements
}
