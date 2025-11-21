import React, { useContext } from 'react'
import { Navigate, Outlet, useRoutes, useLocation } from 'react-router-dom'
import { AuthContext } from './contexts/auth.context'

import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'

import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Verify from './pages/VerifyPage'
import Shop from './pages/Shop'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import WishList from './pages/WishList'
import Logout from './components/Logout'
import NotFound from './pages/NotFound'
import OAuth2Callback from './components/OAuth2Callback'
import ProfileLayout from './layouts/ProfileLayout'
import Profile from './pages/Profile'
import AddressBook from './pages/AddressBook'

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
        }
      ]
    },

    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <Shop /> },
        { path: 'men', element: <ProductList category={'men'} /> },
        { path: 'women', element: <ProductList category={'women'} /> },
        { path: 'kids', element: <ProductList category={'kids'} /> },
        { path: 'product/:productId', element: <ProductDetail /> },
        { path: 'oauth2/callback', element: <OAuth2Callback /> },

        {
          element: <ProtectedRoute />,
          children: [
            { path: 'cart', element: <Cart /> },
            { path: 'wishlist', element: <WishList /> },
            { path: 'logout', element: <Logout /> },

            {
              path: 'profile',
              element: <ProfileLayout />,
              children: [
                { index: true, element: <Profile /> },

                { path: 'address', element: <AddressBook /> },

                { path: 'orders', element: <div>Order History</div> }
              ]
            }
          ]
        },

        // 404 trong MainLayout
        { path: '*', element: <NotFound /> }
      ]
    }
  ])

  return routeElements
}
