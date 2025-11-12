import React from 'react'
import logo from './logo.svg'
import './App.css'
import AuthHeader from './components/AuthHeader'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import useRouteElements from './useRouteElements'

function App() {
  const routeElements = useRouteElements()

  return routeElements
}

export default App
