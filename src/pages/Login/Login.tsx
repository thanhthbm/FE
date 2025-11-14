import React, { useContext, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import BackgroundImage from '../../assets/img/bg-1.png'
import GoogleButton from '../../components/GoogleButton'
import { useForm } from 'react-hook-form'
import { LoginRequest } from '../../types/auth.type'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../../validations/auth.schema'
import { useMutation } from '@tanstack/react-query'
import authApi from '../../apis/auth.api'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { setAccessTokenToLs } from '../../utils/auth'
import { AuthContext } from '../../contexts/auth.context'
import axios from 'axios'

export default function Login() {
  // chỉ dùng state cho việc show/hide password
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { setIsAuthenticated } = useContext(AuthContext)
  const [username, setUsername] = useState<string>()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit = (data: LoginRequest) => {
    console.log('submit', data)
    setUsername(data.username)
    loginMutation.mutate(data)
  }

  const loginMutation = useMutation({
    mutationFn: (body: LoginRequest) => authApi.login(body),
    onSuccess: (data) => {
      console.log(data)
      setAccessTokenToLs(data.data.token)
      setIsAuthenticated(true)
      navigate('/')
    },
    onError: (err: any) => {
      console.log(err)
      if (axios.isAxiosError(err)) {
        const code = err.response?.status
        if (code === 403) {
          // return <Navigate username={username} />
          sessionStorage.setItem('username', username as string)
          navigate('/verify')
        }
      }
    }
  })

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

          <GoogleButton />

          <div className='flex items-center my-7'>
            <div className='flex-1 h-px bg-gray-300'></div>
            <span className='px-4 text-sm text-gray-500'>OR</span>
            <div className='flex-1 h-px bg-gray-300'></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Email Input */}
            <div className='mb-5'>
              <label htmlFor='username' className='block text-sm font-medium text-gray-700 mb-2'>
                Email Address
              </label>
              <input
                type='email'
                id='username'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors'
                placeholder=''
                {...register('username')}
              />
              {errors.username && <p className='text-sm text-red-600 mt-1'>{errors.username.message}</p>}
            </div>

            {/* Password Input */}
            <div className='mb-2'>
              <div className='flex justify-between items-center mb-2'>
                <label htmlFor='password' className='text-sm font-medium text-gray-700'>
                  Password
                </label>
                <button
                  type='button'
                  onClick={() => setShowPassword((v) => !v)}
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
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors'
                placeholder=''
                {...register('password')}
              />
              {errors.password && <p className='text-sm text-red-600 mt-1'>{errors.password.message}</p>}
            </div>

            <div className='text-right mb-6'>
              <a href='#' className='text-sm text-gray-600 hover:text-gray-900 underline'>
                Forgot your password?
              </a>
            </div>

            {loginMutation.isError && <p className='text-sm text-red-600 mt-1'>An error has occurred</p>}
            <button
              type='submit'
              className='w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors'
            >
              Sign In
            </button>

            <p className='text-center text-sm text-gray-600 mt-6'>
              Don't have an account?{' '}
              <Link to='/register' className='text-gray-900 font-medium underline hover:text-gray-700'>
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
