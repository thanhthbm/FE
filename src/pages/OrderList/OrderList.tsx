import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useOrder } from 'src/hooks/useOrder'
import { OrderDTO } from 'src/types/order.type'
import { formatCurrency, formatDate, getStatusColor, ORDER_TABS } from 'src/utils/format'

const OrderList = () => {
  const { orders, isLoadingOrders } = useOrder()
  const [activeTab, setActiveTab] = useState('ALL')

  const filteredOrders = useMemo(() => {
    if (activeTab === 'ALL') return orders
    return orders.filter((order: any) => order.orderStatus === activeTab)
  }, [orders, activeTab])

  if (isLoadingOrders) {
    return (
      <div className='max-w-4xl mx-auto p-4 space-y-4'>
        {[1, 2, 3].map((i) => (
          <div key={i} className='h-48 bg-gray-200 rounded-lg animate-pulse'></div>
        ))}
      </div>
    )
  }

  return (
    <div className='max-w-5xl mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6'>My Orders</h1>

      {/* --- TABS NAVIGATION --- */}
      <div className='flex overflow-x-auto border-b border-gray-200 mb-6 hide-scrollbar'>
        {ORDER_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 whitespace-nowrap text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === tab.id ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* --- ORDER LIST --- */}
      <div className='space-y-4'>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order: OrderDTO) => (
            <div
              key={order.id}
              className='bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden'
            >
              {/* Header: Order ID & Status */}
              <div className='bg-gray-50 px-6 py-3 flex justify-between items-center border-b border-gray-100'>
                <div className='flex flex-col sm:flex-row sm:gap-4'>
                  <span className='font-medium text-gray-700'>Order ID: #{order.id}</span>
                  <span className='text-gray-500 text-sm pt-0.5'>{formatDate(order.orderDate)}</span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.orderStatus)}`}
                >
                  {order.orderStatus}
                </span>
              </div>

              {/* Body: Product List */}
              <div className='p-6'>
                {order.orderItems.map((item: any) => (
                  <div key={item.id} className='flex items-start gap-4 mb-4 last:mb-0'>
                    <div className='w-20 h-20 flex-shrink-0 border rounded-md overflow-hidden bg-gray-100'>
                      <img
                        src={item.productThumbnail || '/placeholder-image.png'}
                        alt={item.productName}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-base font-medium text-gray-900 line-clamp-2'>{item.productName}</h3>
                      <p className='text-sm text-gray-500 mt-1'>Brand: {item.productBrand}</p>
                      <div className='flex justify-between items-center mt-2'>
                        <span className='text-sm text-gray-600'>Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <div className='text-right'>
                      <span className='font-medium text-gray-900'>{formatCurrency(item.subTotal)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer: Total & Actions */}
              <div className='px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-4'>
                <div className='text-gray-700'>
                  Total: <span className='text-xl font-bold text-red-600'>{formatCurrency(order.totalAmount)}</span>
                </div>

                <div className='flex gap-3'>
                  {/* View Detail Button */}
                  {/* <Link
                    to={`/profile/orders/${order.id}`}
                    className='px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors'
                  >
                    View Details
                  </Link> */}

                  {/* Contextual Actions */}
                  {order.orderStatus === 'PENDING' &&
                    order.paymentMethod !== 'COD' &&
                    order.paymentInfo?.paymentStatus !== 'COMPLETED' && (
                      <button className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-medium shadow-sm'>
                        Pay Now
                      </button>
                    )}

                  {order.orderStatus === 'DELIVERED' && (
                    <button className='px-4 py-2 bg-black text-white rounded hover:bg-gray-800 text-sm font-medium shadow-sm'>
                      Buy Again
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          // --- EMPTY STATE ---
          <div className='flex flex-col items-center justify-center py-16 bg-white rounded-lg border border-dashed border-gray-300'>
            <div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-10 w-10 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
                />
              </svg>
            </div>
            <p className='text-gray-500 text-lg mb-4'>You have no orders yet</p>
            <Link to='/' className='px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors'>
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderList
