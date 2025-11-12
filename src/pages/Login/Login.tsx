import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import BackgroundImage from '../../assets/img/bg-1.png'
import GoogleButton from '../../components/GoogleButton'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log('Sign in:', { email, password })
  }

  return (
    <div className='flex min-h-screen'>
      {/* Left Side - Image */}
      <div className='hidden lg:flex lg:flex-1 bg-gradient-to-br from-amber-200 via-orange-300 to-amber-600 items-center justify-center p-10'>
        <div className='w-full max-w-lg h-[600px] rounded-lg overflow-hidden shadow-2xl'>
          <img src={BackgroundImage} alt='Shopping Fashion' className='w-full h-full object-cover' />
        </div>
      </div>

      {/* Right Side - Form */}
      <div className='flex-1 flex items-center justify-center p-8 bg-white'>
        <div className='w-full max-w-md'>
          <h1 className='text-3xl font-semibold text-gray-900 mb-8'>Sign In</h1>

          {/* Google Sign In Button */}
          <GoogleButton />

          {/* Divider */}
          <div className='flex items-center my-7'>
            <div className='flex-1 h-px bg-gray-300'></div>
            <span className='px-4 text-sm text-gray-500'>OR</span>
            <div className='flex-1 h-px bg-gray-300'></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className='mb-5'>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                Email Address
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors'
                placeholder=''
              />
            </div>

            {/* Password Input */}
            <div className='mb-2'>
              <div className='flex justify-between items-center mb-2'>
                <label htmlFor='password' className='text-sm font-medium text-gray-700'>
                  Password
                </label>
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900'
                >
                  {showPassword ? (
                    <>
                      <EyeOff className='w-4 h-4' />
                      <span>Hide</span>
                    </>
                  ) : (
                    <>
                      <Eye className='w-4 h-4' />
                      <span>Hide</span>
                    </>
                  )}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors'
                placeholder=''
              />
            </div>

            {/* Forgot Password */}
            <div className='text-right mb-6'>
              <a href='#' className='text-sm text-gray-600 hover:text-gray-900 underline'>
                Forgot your password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type='submit'
              className='w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors'
            >
              Sign In
            </button>

            {/* Sign Up Link */}
            <p className='text-center text-sm text-gray-600 mt-6'>
              Don't have an account?{' '}
              <a href='#' className='text-gray-900 font-medium underline hover:text-gray-700'>
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
