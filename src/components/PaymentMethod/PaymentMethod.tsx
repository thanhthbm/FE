import { Truck } from 'lucide-react'
import React from 'react'
import VNPayLogo from '../../assets/img/vnpay.png'

const PaymentMethod = () => {
  return (
    <div className='text-center'>
      <p className='text-sm text-gray-600 mb-3'>Accepted Payment Methods</p>
      <div className='flex justify-center gap-3'>
        {/* VNPAY */}
        <div
          className='h-10 px-3 bg-white border border-gray-200 rounded flex items-center justify-center'
          title='VNPAY'
        >
          <img src={VNPayLogo} alt='VNPAY' className='h-6 object-contain' />
        </div>

        {/* COD (Cash on Delivery) */}
        <div
          className='h-10 px-3 bg-white border border-gray-200 rounded flex items-center justify-center gap-1'
          title='Cash on Delivery'
        >
          <Truck className='w-5 h-5 text-gray-600' />
          <span className='text-xs font-bold text-gray-700'>COD</span>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethod
