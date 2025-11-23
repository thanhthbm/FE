import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, CreditCard, ChevronRight, ArrowLeft, Truck } from 'lucide-react'
import { toast } from 'react-toastify'

import useCart from '../../hooks/useCart'
import { useAddress } from '../../hooks/useAddress'
import { useOrder } from '../../hooks/useOrder'
import { formatPriceToStr } from '../../utils/format'
import { Address } from '../../types/address.type'
import { CreateOrderRequest } from '../../types/order.type'
import VNPayLogo from '../../assets/img/vnpay.png'

export default function Checkout() {
  const { cartItems, totalPrice } = useCart()
  const { addresses, isLoading: isLoadingAddress } = useAddress()
  const { createOrder, isCreatingOrder } = useOrder()

  const [selectedAddressId, setSelectedAddressId] = useState<string>('')
  const [paymentMethod, setPaymentMethod] = useState<string>('COD')
  const [note, setNote] = useState<string>('')

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find((addr) => addr.isDefault)
      setSelectedAddressId(defaultAddr ? defaultAddr.id : addresses[0].id)
    }
  }, [addresses, selectedAddressId])

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId)
  const shippingFee = 0
  const finalTotal = totalPrice + shippingFee

  const handlePlaceOrder = () => {
    if (!selectedAddressId) {
      toast.warn('Please select a shipping address')
      return
    }

    if (cartItems.length === 0) {
      toast.warn('Your cart is empty')
      return
    }

    const orderData: CreateOrderRequest = {
      addressId: selectedAddressId,
      paymentMethod: paymentMethod,
      note: note,
      shippingFee: shippingFee
    }

    createOrder(orderData)
  }

  if (isLoadingAddress) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='w-10 h-10 border-4 border-pink-600 border-t-transparent rounded-full animate-spin'></div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className='min-h-[60vh] flex flex-col items-center justify-center bg-gray-50'>
        <h2 className='text-2xl font-bold text-gray-900 mb-4'>Your cart is empty</h2>
        <Link
          to='/'
          className='flex items-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors'
        >
          <ArrowLeft className='w-5 h-5' />
          Return to Shop
        </Link>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='container mx-auto px-4 md:px-6'>
        {/* Breadcrumb */}
        <div className='flex items-center text-sm text-gray-500 mb-6'>
          <Link to='/cart' className='hover:text-pink-600'>
            Cart
          </Link>
          <ChevronRight className='w-4 h-4 mx-2' />
          <span className='font-semibold text-gray-900'>Checkout</span>
        </div>

        <h1 className='text-3xl font-bold text-gray-900 mb-8'>Checkout</h1>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* --- LEFT COLUMN --- */}
          <div className='lg:col-span-2 space-y-6'>
            {/* 1. Shipping Address */}
            <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-lg font-bold text-gray-900 flex items-center gap-2'>
                  <MapPin className='w-5 h-5 text-pink-600' />
                  Shipping Address
                </h2>
                <Link to='/profile/address' className='text-sm text-pink-600 font-medium hover:underline'>
                  Manage Address
                </Link>
              </div>

              {addresses.length > 0 ? (
                <div className='grid gap-4 sm:grid-cols-2'>
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`relative cursor-pointer rounded-lg border p-4 transition-all ${
                        selectedAddressId === addr.id
                          ? 'border-pink-600 bg-pink-50 ring-1 ring-pink-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className='flex items-start justify-between'>
                        <div>
                          <p className='font-bold text-gray-900'>{addr.receiverName}</p>
                          <p className='text-sm text-gray-500'>{addr.phoneNumber}</p>
                          <p className='mt-1 text-sm text-gray-600 line-clamp-2'>
                            {addr.detail}, {addr.ward}, {addr.province}
                          </p>
                        </div>
                        {addr.isDefault && (
                          <span className='absolute top-2 right-2 bg-pink-100 text-pink-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase'>
                            Default
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='text-center py-6 border-2 border-dashed border-gray-200 rounded-lg'>
                  <p className='text-gray-500 mb-3'>You don't have any address yet</p>
                  <Link
                    to='/profile/address'
                    className='bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800'
                  >
                    + Add New Address
                  </Link>
                </div>
              )}
            </div>

            {/* 2. Payment Method */}
            <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
              <h2 className='text-lg font-bold text-gray-900 flex items-center gap-2 mb-4'>
                <CreditCard className='w-5 h-5 text-pink-600' />
                Payment Method
              </h2>

              <div className='space-y-3'>
                {/* COD */}
                <label
                  className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-pink-600 bg-pink-50 ring-1 ring-pink-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type='radio'
                    name='payment'
                    value='COD'
                    checked={paymentMethod === 'COD'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className='w-5 h-5 text-pink-600 focus:ring-pink-500 border-gray-300'
                  />
                  <div className='flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full'>
                    <Truck className='w-5 h-5 text-gray-600' />
                  </div>
                  <div className='flex-1'>
                    <p className='font-semibold text-gray-900'>Cash on Delivery (COD)</p>
                    <p className='text-xs text-gray-500'>Pay cash upon delivery.</p>
                  </div>
                </label>

                {/* VNPAY */}
                <label
                  className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                    paymentMethod === 'VNPAY'
                      ? 'border-pink-600 bg-pink-50 ring-1 ring-pink-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type='radio'
                    name='payment'
                    value='VNPAY'
                    checked={paymentMethod === 'VNPAY'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className='w-5 h-5 text-pink-600 focus:ring-pink-500 border-gray-300'
                  />
                  <div className='flex items-center justify-center w-10 h-10 bg-white border border-gray-100 rounded-full p-1'>
                    <img src={VNPayLogo} alt='VNPAY' className='w-full object-contain' />
                  </div>
                  <div className='flex-1'>
                    <p className='font-semibold text-gray-900'>VNPAY E-Wallet</p>
                    <p className='text-xs text-gray-500'>Fast & Secure payment via VNPAY gateway.</p>
                  </div>
                </label>
              </div>
            </div>

            {/* 3. Note */}
            <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
              <h2 className='text-lg font-bold text-gray-900 mb-4'>Order Notes (Optional)</h2>
              <textarea
                rows={3}
                className='w-full rounded-lg border border-gray-300 p-3 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500'
                placeholder='Notes about your order, e.g. special notes for delivery.'
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>

          {/* --- RIGHT COLUMN: SUMMARY --- */}
          <div className='lg:col-span-1'>
            <div className='sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
              <h2 className='mb-6 text-xl font-bold text-gray-900'>Order Summary</h2>

              {/* Product List */}
              <div className='max-h-60 overflow-y-auto space-y-4 mb-6 pr-2 custom-scrollbar'>
                {cartItems.map((item) => (
                  <div key={item.variantId} className='flex gap-3'>
                    <div className='w-14 h-14 flex-shrink-0 rounded-md border border-gray-100 overflow-hidden'>
                      <img
                        src={item.imageUrl || 'https://via.placeholder.com/50'}
                        alt={item.productName}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-medium text-gray-900 truncate'>{item.productName}</p>
                      <p className='text-xs text-gray-500'>{item.variantName}</p>
                      <div className='flex justify-between mt-1'>
                        <span className='text-xs text-gray-500'>Qty: {item.quantity}</span>
                        <span className='text-xs font-semibold text-gray-900'>
                          {formatPriceToStr(item.price * item.quantity)} VND
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className='space-y-3 border-t border-gray-100 pt-4 text-sm'>
                <div className='flex justify-between text-gray-600'>
                  <span>Subtotal</span>
                  <span>{formatPriceToStr(totalPrice)} VND</span>
                </div>
                <div className='flex justify-between text-gray-600'>
                  <span>Shipping Fee</span>
                  <span className='text-green-600 font-medium'>
                    {shippingFee === 0 ? 'Free' : `${formatPriceToStr(shippingFee)} VND`}
                  </span>
                </div>

                <div className='flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100 mt-2'>
                  <span>Total</span>
                  <span className='text-pink-600 text-xl'>{formatPriceToStr(finalTotal)} VND</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={!selectedAddressId || isCreatingOrder}
                className='w-full mt-6 bg-pink-600 hover:bg-pink-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3.5 rounded-lg font-bold text-base shadow-lg shadow-pink-200 transition-all hover:translate-y-[-1px]'
              >
                {isCreatingOrder ? 'Processing...' : 'Place Order'}
              </button>

              <p className='mt-4 text-center text-xs text-gray-400'>
                By clicking "Place Order", you agree to our terms and conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
