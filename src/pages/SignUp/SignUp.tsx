import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import GoogleButton from '../../components/GoogleButton'

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = () => {
    console.log('Sign up:', formData)
  }

  return (
    <div className='flex min-h-screen'>
      {/* Left Side - Image */}
      <div className='flex flex-1 bg-gradient-to-br from-amber-200 via-orange-300 to-amber-600 items-center justify-center p-10'>
        <div className='w-full max-w-lg h-[600px] rounded-lg overflow-hidden shadow-2xl'>
          <img
            src='https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80'
            alt='Shopping Fashion'
            className='w-full h-full object-cover'
          />
        </div>
      </div>

      {/* Right Side - Form */}
      <div className='flex-1 flex items-center justify-center p-8 bg-white'>
        <div className='w-full max-w-md'>
          <h1 className='text-3xl font-semibold text-gray-900 mb-8'>Sign Up</h1>

          {/* Google Sign Up Button */}
          <GoogleButton />

          {/* Divider */}
          <div className='flex items-center my-7'>
            <div className='flex-1 h-px bg-gray-300'></div>
            <span className='px-4 text-sm text-gray-500'>OR</span>
            <div className='flex-1 h-px bg-gray-300'></div>
          </div>

          {/* First Name & Last Name */}
          <div className='grid grid-cols-2 gap-4 mb-5'>
            <div>
              <label htmlFor='firstName' className='block text-sm font-medium text-gray-700 mb-2'>
                First Name
              </label>
              <input
                type='text'
                id='firstName'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors'
                placeholder=''
              />
            </div>
            <div>
              <label htmlFor='lastName' className='block text-sm font-medium text-gray-700 mb-2'>
                Last Name
              </label>
              <input
                type='text'
                id='lastName'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors'
                placeholder=''
              />
            </div>
          </div>

          {/* Email Input */}
          <div className='mb-5'>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
              Email Address
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors'
              placeholder=''
            />
          </div>

          {/* Phone Number Input */}
          <div className='mb-5'>
            <label htmlFor='phoneNumber' className='block text-sm font-medium text-gray-700 mb-2'>
              Phone Number
            </label>
            <input
              type='tel'
              id='phoneNumber'
              name='phoneNumber'
              value={formData.phoneNumber}
              onChange={handleChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors'
              placeholder=''
            />
          </div>

          {/* Password Input */}
          <div className='mb-6'>
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
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors'
              placeholder=''
            />
          </div>

          {/* Sign Up Button */}
          <button
            onClick={handleSubmit}
            className='w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors'
          >
            Sign Up
          </button>

          {/* Sign In Link */}
          <p className='text-center text-sm text-gray-600 mt-6'>
            Already have an account?{' '}
            <button className='text-gray-900 font-medium underline hover:text-gray-700'>Sign in</button>
          </p>
        </div>
      </div>
    </div>
  )
}
