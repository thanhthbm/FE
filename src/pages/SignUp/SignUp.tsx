import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import GoogleButton from '../../components/GoogleButton'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegistrationRequest } from '../../types/auth.type'
import { Resolver, useForm } from 'react-hook-form'
import { registerSchema } from '../../validations/auth.schema'
import { useMutation } from '@tanstack/react-query'
import authApi from '../../apis/auth.api'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function SignUp() {
  const resolver = yupResolver(registerSchema) as Resolver<RegistrationRequest>

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegistrationRequest>({
    resolver
  })

  const [error, setError] = useState<string>()

  const [showPassword, setShowPassword] = useState(false)

  // mutation đăng ký
  const registerMutation = useMutation({
    mutationFn: (body: RegistrationRequest) => authApi.registerAccount(body),
    onSuccess: (data) => {
      console.log('register success', data)
      // redirect / thông báo thành công ở đây
    },
    onError: (err: any) => {
      console.error('register error', err)
      if (axios.isAxiosError(err)) {
        const status = err.response?.status
        const message = err.response?.data?.message
        setError(message)
      }
    }
  })

  const onSubmit = (data: RegistrationRequest) => {
    registerMutation.mutate(data)
  }

  const inputBaseClass = 'w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors'

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

          {/* Show server error if any */}
          {registerMutation.isError && (
            <div className='mb-4 text-sm text-red-600'>
              {/*
                Nếu err trả về object, bạn có thể map message phù hợp.
                Hiện tại hiển thị string chung.
              */}
              {error ? error : 'Register failed'}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* First Name & Last Name */}
            <div className='grid grid-cols-2 gap-4 mb-5'>
              <div>
                <label htmlFor='firstName' className='block text-sm font-medium text-gray-700 mb-2'>
                  First Name
                </label>
                <input
                  type='text'
                  id='firstName'
                  aria-invalid={!!errors.firstName}
                  className={`${inputBaseClass} border-gray-300 ${errors.firstName ? 'border-red-500' : 'focus:border-gray-900'}`}
                  placeholder=''
                  {...register('firstName')}
                />
                {errors.firstName && (
                  <p className='mt-1 text-sm text-red-600'>{errors.firstName.message?.toString()}</p>
                )}
              </div>

              <div>
                <label htmlFor='lastName' className='block text-sm font-medium text-gray-700 mb-2'>
                  Last Name
                </label>
                <input
                  type='text'
                  id='lastName'
                  aria-invalid={!!errors.lastName}
                  className={`${inputBaseClass} border-gray-300 ${errors.lastName ? 'border-red-500' : 'focus:border-gray-900'}`}
                  placeholder=''
                  {...register('lastName')}
                />
                {errors.lastName && <p className='mt-1 text-sm text-red-600'>{errors.lastName.message?.toString()}</p>}
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
                aria-invalid={!!errors.email}
                className={`${inputBaseClass} border-gray-300 ${errors.email ? 'border-red-500' : 'focus:border-gray-900'}`}
                placeholder=''
                {...register('email')}
              />
              {errors.email && <p className='mt-1 text-sm text-red-600'>{errors.email.message?.toString()}</p>}
            </div>

            {/* Phone Number Input */}
            <div className='mb-5'>
              <label htmlFor='phoneNumber' className='block text-sm font-medium text-gray-700 mb-2'>
                Phone Number
              </label>
              <input
                type='tel'
                id='phoneNumber'
                aria-invalid={!!errors.phoneNumber}
                className={`${inputBaseClass} border-gray-300 ${errors.phoneNumber ? 'border-red-500' : 'focus:border-gray-900'}`}
                placeholder=''
                {...register('phoneNumber')}
              />
              {errors.phoneNumber && (
                <p className='mt-1 text-sm text-red-600'>{errors.phoneNumber.message?.toString()}</p>
              )}
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
                      <span>Show</span>
                    </>
                  )}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                aria-invalid={!!errors.password}
                className={`${inputBaseClass} border-gray-300 ${errors.password ? 'border-red-500' : 'focus:border-gray-900'}`}
                placeholder=''
                {...register('password')}
              />
              {errors.password && <p className='mt-1 text-sm text-red-600'>{errors.password.message?.toString()}</p>}
            </div>

            {/* Sign Up Button */}
            <button
              type='submit'
              disabled={registerMutation.isPending}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                registerMutation.isPending ? 'bg-gray-400 text-white' : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {registerMutation.isPending ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>

          {/* Sign In Link */}
          <Link to='/login' className='text-center text-sm text-gray-600 mt-6'>
            Already have an account?{' '}
            <button className='text-gray-900 font-medium underline hover:text-gray-700'>Sign in</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
