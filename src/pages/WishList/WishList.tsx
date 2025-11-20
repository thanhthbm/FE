import React from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Heart, ArrowLeft } from 'lucide-react'
import { formatPriceToStr } from '../../utils/format'
import { useWishList } from '../../hooks/useWishList'

export default function WishList() {
  const { wishlistItems, isLoading, toggleWishList } = useWishList()

  const handleRemove = (productId: string) => {
    if (window.confirm('Are you sure you want to remove this item from your wishlist?')) {
      toggleWishList(productId)
    }
  }

  if (isLoading) {
    return (
      <div className='bg-white min-h-screen flex items-center justify-center'>
        <div className='w-16 h-16 border-4 border-pink-600 border-t-transparent rounded-full animate-spin'></div>
      </div>
    )
  }

  if (wishlistItems.length === 0) {
    return (
      <div className='bg-gray-50 min-h-screen flex flex-col items-center justify-center py-12'>
        <div className='bg-white p-8 rounded-lg shadow-sm text-center max-w-md mx-auto'>
          <div className='w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6'>
            <Heart className='w-10 h-10 text-pink-500' />
          </div>
          <h2 className='text-2xl font-bold text-gray-900 mb-3'>Your wishlist is empty</h2>
          <p className='text-gray-500 mb-8'>
            You haven't saved any items yet. Browse our catalog and heart the items you love!
          </p>
          <Link
            to='/'
            className='inline-flex items-center gap-2 bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-all shadow-md hover:shadow-lg'
          >
            <ArrowLeft className='w-5 h-5' />
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='container mx-auto px-4 md:px-6 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-3'>
            My Wishlist
            <span className='text-lg font-normal text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm'>
              {wishlistItems.length} items
            </span>
          </h1>
          <div className='text-sm text-gray-500 mt-2'>
            <Link to='/' className='hover:text-pink-600 transition-colors'>
              Home
            </Link>
            <span className='mx-2'>/</span>
            <span>Wishlist</span>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className='group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative'
            >
              <Link to={`/product/${product.id}`} className='relative aspect-[3/4] overflow-hidden bg-gray-100'>
                <img
                  src={product.thumbnail || 'https://via.placeholder.com/300x400?text=No+Image'}
                  alt={product.name}
                  className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                />

                {product.newArrival && (
                  <div className='absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider'>
                    New
                  </div>
                )}
              </Link>

              <div className='p-4 flex flex-col flex-1'>
                <div className='mb-1'>
                  <p className='text-xs text-gray-500 uppercase font-semibold tracking-wide'>
                    {product.brand || 'FashionShop'}
                  </p>
                </div>

                <Link to={`/product/${product.id}`} className='block mb-2'>
                  <h3 className='text-gray-900 font-medium text-lg leading-snug group-hover:text-pink-600 transition-colors line-clamp-2'>
                    {product.name}
                  </h3>
                </Link>

                <div className='mt-auto pt-3 border-t border-gray-100 flex items-center justify-between'>
                  <span className='text-xl font-bold text-gray-900'>
                    {formatPriceToStr(product.price)} <span className='text-sm font-normal text-gray-500'>VND</span>
                  </span>
                </div>

                <button
                  onClick={() => handleRemove(product.id)}
                  className='mt-4 w-full flex items-center justify-center gap-2 text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600 py-2.5 rounded-lg font-medium transition-colors duration-200'
                >
                  <Trash2 className='w-4 h-4' />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
