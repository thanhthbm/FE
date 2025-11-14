import { useMutation } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import { data, useLocation, useNavigate } from 'react-router-dom'
import { VerifyRequest } from '../../types/auth.type'
import authApi from '../../apis/auth.api'
import { AuthContext } from '../../contexts/auth.context'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Verify() {
  const [code, setCode] = useState('')

  const location = useLocation()
  const username = sessionStorage.getItem('username')
  const navigate = useNavigate()

  useEffect(() => {
    if (!username) {
      navigate('/login')
    }
  }, [username, navigate])

  const handleVerify = () => {
    console.log('Verification code:', code)
    verifyMutation.mutate({ username: username as string, code })
  }

  const handleResend = () => {
    console.log('Resend code')
  }

  const verifyMutation = useMutation({
    mutationFn: ({ username, code }: VerifyRequest) => authApi.verify({ username, code }),
    onSuccess: (data) => {
      toast.success('Verified successfully!')
      navigate('/login')
    }
  })

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
          <h1 className='text-3xl font-semibold text-gray-900 mb-3'>Verification Code</h1>

          <p className='text-gray-600 mb-8'>
            We've sent a verification code to your email. Please enter the code below to continue.
          </p>

          {/* Verification Code Input */}
          <div className='mb-6'>
            <label htmlFor='code' className='block text-sm font-medium text-gray-700 mb-2'>
              Verification Code
            </label>
            <input
              type='text'
              id='code'
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors text-center text-lg tracking-widest'
              placeholder='000000'
              maxLength={6}
            />
          </div>

          {verifyMutation.isError && <p className='text-sm text-red-600'>Invalid verification code</p>}
          {/* Verify Button */}
          <button
            onClick={handleVerify}
            className='w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors mb-4'
          >
            Verify
          </button>

          {/* Resend Code */}
          <p className='text-center text-sm text-gray-600'>
            Didn't receive the code?{' '}
            <button onClick={handleResend} className='text-gray-900 font-medium underline hover:text-gray-700'>
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
