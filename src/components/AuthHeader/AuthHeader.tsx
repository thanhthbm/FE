import React from 'react'
import { Link } from 'react-router-dom'

const AuthHeader = () => {
  return (
    <header className='flex items-center justify-between px-8 py-4 bg-white border-b'>
      <a className='text-3xl font-bold' href='/'>
        FashionShop
      </a>

      <div className='flex items-center space-x-6'>
        <Link
          to='/login'
          className='px-4 py-2 text-sm font-medium text-black border border-black rounded hover:bg-gray-100'
        >
          Login
        </Link>

        <Link to='/register' className='px-4 py-2 text-sm font-medium text-white bg-black rounded'>
          Register
        </Link>
      </div>
    </header>
  )
}

export default AuthHeader
