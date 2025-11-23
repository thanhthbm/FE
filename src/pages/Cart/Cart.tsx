import React, { useState } from 'react'
import { Minus, Plus, ArrowLeft, ArrowRight, CreditCard, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CartItem } from '../../types/cartItem.type'
import useCart from '../../hooks/useCart'
import PaymentMethod from 'src/components/PaymentMethod'

export default function Cart() {
  const { cartItems, totalPrice, updateQuantity, removeFromCart, isUpdating, clearCart, isClearing } = useCart()

  const [promoCode, setPromoCode] = useState('')

  const handleUpdateQuantity = (variantId: string, currentQuantity: number, delta: number) => {
    const newQuantity = currentQuantity + delta

    if (newQuantity < 1) return

    updateQuantity({
      variantId,
      quantity: newQuantity
    })
  }

  const handleRemoveItem = (variantId: string) => {
    removeFromCart(variantId)
  }

  // Xử lý xóa toàn bộ với confirm
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to remove all items from your cart?')) {
      clearCart()
    }
  }

  const subtotal = totalPrice
  const shipping = 0
  const taxes = subtotal * 0.05
  const total = subtotal + shipping + taxes

  if (cartItems.length === 0) {
    return (
      <div className='bg-gray-50 min-h-screen flex flex-col items-center justify-center'>
        <div className='bg-white p-8 rounded-lg shadow-sm text-center'>
          <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
            <ArrowRight className='w-8 h-8 text-gray-400' />
          </div>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>Your cart is empty</h2>
          <p className='text-gray-600 mb-6'>Looks like you haven't added anything to your cart yet.</p>
          <Link
            to='/'
            className='inline-flex items-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors'
          >
            <ArrowLeft className='w-5 h-5' />
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='container mx-auto px-6 py-8'>
        {/* Breadcrumb */}
        <div className='text-sm text-gray-600 mb-4'>
          <Link to='/' className='hover:text-pink-600'>
            Home
          </Link>
          <span className='mx-2'>/</span>
          <span className='text-gray-900'>Shopping Cart</span>
        </div>

        {/* Title */}
        <h1 className='text-4xl font-bold text-gray-900 mb-8'>Shopping Cart</h1>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Cart Items List */}
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-lg shadow-sm p-6'>
              {/* Header của danh sách items: Bao gồm Title và Nút Clear */}
              <div className='flex items-center justify-between mb-6 border-b border-gray-100 pb-4'>
                <h2 className='text-xl font-bold text-gray-900'>
                  Cart Items <span className='text-gray-500 text-lg font-medium'>({cartItems.length})</span>
                </h2>

                <button
                  onClick={handleClearCart}
                  disabled={isClearing || isUpdating}
                  className='group flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  <Trash2 className='w-4 h-4 transition-transform group-hover:scale-110' />
                  <span className='font-medium'>{isClearing ? 'Clearing...' : 'Clear Cart'}</span>
                </button>
              </div>

              <div className='space-y-6'>
                {cartItems.map((item: CartItem) => (
                  <div key={item.variantId} className='flex gap-4 pb-6 border-b border-gray-200 last:border-0'>
                    {/* Product Image */}
                    <div className='w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200'>
                      <img
                        src={item.imageUrl || 'https://via.placeholder.com/150'}
                        alt={item.productName}
                        className='w-full h-full object-cover'
                      />
                    </div>

                    {/* Product Details */}
                    <div className='flex-1'>
                      <h3 className='font-semibold text-gray-900 mb-1 text-lg'>
                        <Link to={`/product/${item.productId}`} className='hover:text-pink-600 transition-colors'>
                          {item.productName}
                        </Link>
                      </h3>
                      <p className='text-sm text-gray-600 bg-gray-50 inline-block px-2 py-1 rounded mt-1'>
                        {item.variantName || 'Standard'}
                      </p>
                    </div>

                    {/* Quantity Controls & Price */}
                    <div className='flex flex-col items-end gap-2'>
                      <div className='flex items-center gap-3 border border-gray-300 rounded-lg'>
                        <button
                          onClick={() => handleUpdateQuantity(item.variantId, item.quantity, -1)}
                          disabled={isUpdating || item.quantity <= 1}
                          className='p-2 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                          aria-label='Decrease quantity'
                        >
                          <Minus className='w-4 h-4' />
                        </button>

                        <span className='w-8 text-center font-semibold'>{item.quantity}</span>

                        <button
                          onClick={() => handleUpdateQuantity(item.variantId, item.quantity, 1)}
                          disabled={isUpdating}
                          className='p-2 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                          aria-label='Increase quantity'
                        >
                          <Plus className='w-4 h-4' />
                        </button>
                      </div>

                      <div className='text-right'>
                        <p className='text-lg font-bold text-gray-900'>{item.price.toLocaleString()} VNĐ</p>
                        {item.quantity > 1 && (
                          <p className='text-xs text-gray-500'>
                            {(item.price * item.quantity).toLocaleString()} VNĐ total
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.variantId)}
                        className='text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1 mt-2 transition-colors'
                      >
                        <Trash2 className='w-4 h-4' /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping Link */}
              <Link
                to='/'
                className='flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium mt-6 inline-block transition-colors'
              >
                <ArrowLeft className='w-5 h-5' />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-lg shadow-sm p-6 sticky top-8'>
              <h2 className='text-xl font-bold text-gray-900 mb-6'>Order Summary</h2>

              <div className='space-y-4 mb-6'>
                <div className='flex justify-between text-gray-700'>
                  <span>Subtotal</span>
                  <span className='font-semibold'>{subtotal.toLocaleString()} VND</span>
                </div>
                <div className='flex justify-between text-gray-700'>
                  <span>Shipping</span>
                  <span className='font-semibold'>{shipping.toLocaleString()} VND</span>
                </div>
                <div className='flex justify-between text-gray-700'>
                  <span>Taxes (8%)</span>
                  <span className='font-semibold'>{taxes.toLocaleString()} VND</span>
                </div>
                <div className='border-t border-gray-200 pt-4'>
                  <div className='flex justify-between text-lg font-bold text-gray-900'>
                    <span>Total</span>
                    <span>{total.toLocaleString()} VNĐ</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className='mb-6'>
                <p className='text-sm font-medium text-gray-700 mb-3'>Have a promo code?</p>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder='Enter code'
                    className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-600'
                  />
                  <button className='px-6 py-2 bg-pink-100 text-pink-600 rounded-lg font-semibold hover:bg-pink-200 transition-colors'>
                    Apply
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to='/checkout'
                className='w-full bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors mb-6'
              >
                Proceed to Checkout
                <ArrowRight className='w-5 h-5' />
              </Link>

              {/* Payment Methods */}
              <PaymentMethod />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
