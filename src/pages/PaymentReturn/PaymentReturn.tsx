import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useOrder } from 'src/hooks/useOrder'

const PaymentReturn = () => {
  const navigate = useNavigate()

  const { verifyPayment, isVerifyingPayment, isVerifySuccess, isVerifyError } = useOrder()

  useEffect(() => {
    if (isVerifySuccess && verifyPayment) {
      if (verifyPayment.status === 'success') {
        toast.success('Payment successful!')
      } else {
        toast.error('Payment failed or cancelled!')
      }
    }
    if (isVerifyError) {
      toast.error('Transaction verification failed!')
    }
  }, [isVerifySuccess, isVerifyError, verifyPayment])


  return (
    <div className='container mx-auto p-10 text-center'>
      {isVerifyingPayment && (
        <div className='mt-10'>
          <h2 className='text-xl font-semibold text-gray-600'>Verifying transaction...</h2>
        </div>
      )}

      {isVerifySuccess && verifyPayment?.status === 'success' && (
        <div className='mt-10 bg-green-50 p-6 rounded-lg shadow-sm inline-block'>
          <svg className='w-16 h-16 text-green-500 mx-auto mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7'></path>
          </svg>

          <h2 className='text-2xl font-bold text-green-600 mb-2'>Payment Successful!</h2>
          <p className='text-gray-600 mb-6'>Thank you for your purchase.</p>

          <button
            onClick={() => navigate('/profile/orders')}
            className='px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'
          >
            View My Orders
          </button>
        </div>
      )}

      {isVerifySuccess && verifyPayment?.status !== 'success' && (
        <div className='mt-10 bg-red-50 p-6 rounded-lg shadow-sm inline-block'>
          <svg className='w-16 h-16 text-red-500 mx-auto mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
          </svg>

          <h2 className='text-2xl font-bold text-red-600 mb-2'>Payment Failed</h2>
          <p className='text-gray-600 mb-6'>The transaction was cancelled or an error occurred.</p>

          <button
            onClick={() => navigate('/checkout')}
            className='px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors'
          >
            Return to Home
          </button>
        </div>
      )}

      {isVerifyError && (
        <div className='mt-10'>
          <h2 className='text-red-500 text-xl font-bold'>Unable to verify transaction.</h2>
          <p className='text-gray-500 mt-2'>Please contact customer support if money was deducted.</p>
          <button onClick={() => navigate('/')} className='mt-4 text-blue-500 underline'>
            Back to Home
          </button>
        </div>
      )}
    </div>
  )
}

export default PaymentReturn
