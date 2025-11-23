import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { formatPriceToStr } from '../../utils/format'
import { useProductList } from '../../hooks/useProductList' // Import hook mới
import { Product } from '../../types/product.type'

interface IProps {
  category: string
}

export default function ProductList(props: IProps) {
  const { category } = props
  const navigate = useNavigate()

  const {
    categoryTypes,
    products,
    meta,
    isLoading,
    selectedCategoryType,
    priceRange,
    sortBy,
    currentPage,
    handlePriceRangeChange,
    handleSortChange,
    handleClearFilters,
    handlePageChange,
    toggleCategoryType
  } = useProductList({ category })

  const handleProductClick = (product: Product): void => {
    navigate(`/product/${product.id}`)
  }

  if (isLoading) {
    return (
      <div className='bg-gray-50 min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-pink-600 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='container mx-auto px-6 py-8'>
        <div className='flex gap-8'>
          {/* Sidebar Filters */}
          <div className='w-64 flex-shrink-0'>
            <div className='bg-white rounded-lg p-6 sticky top-8'>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-bold'>Filters</h2>
                <button onClick={handleClearFilters} className='text-sm text-gray-500 hover:text-gray-700'>
                  Clear All
                </button>
              </div>

              {/* Category Type */}
              <div className='mb-6'>
                <h3 className='font-semibold mb-3'>Category Type</h3>
                {categoryTypes.length > 0 ? (
                  <div className='flex flex-col gap-2 max-h-48 overflow-auto pr-2'>
                    {categoryTypes.map((ct) => (
                      <label key={ct.code} className='flex items-center gap-2 text-sm'>
                        <input
                          type='checkbox'
                          checked={selectedCategoryType.includes(ct.code)}
                          onChange={() => toggleCategoryType(ct.code)}
                          className='w-4 h-4'
                        />
                        <span>{ct.name || ct.code}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className='text-sm text-gray-500'>No types</div>
                )}
              </div>

              {/* Price Range */}
              <div className='mb-6'>
                <h3 className='font-semibold mb-3'>Price Range</h3>
                <div className='mb-4'>
                  <input
                    type='range'
                    min='0'
                    max='10000000'
                    step='100000'
                    value={priceRange[1]}
                    onChange={handlePriceRangeChange}
                    className='w-full accent-pink-600'
                  />
                </div>
                <div className='flex justify-between text-sm text-gray-600'>
                  <span>{formatPriceToStr(priceRange[0])}</span>
                  <span>{formatPriceToStr(priceRange[1])}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className='flex-1'>
            {/* Header */}
            <div className='flex justify-between items-center mb-6'>
              <div>
                <h1 className='text-4xl font-bold text-gray-900 mb-2'>{products[0]?.categoryName || 'Products'}</h1>
                {meta && (
                  <p className='text-gray-600'>
                    Showing {(meta.page - 1) * meta.pageSize + 1}-{Math.min(meta.page * meta.pageSize, meta.total)} of{' '}
                    {meta.total} products.
                  </p>
                )}
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-sm text-gray-600'>Sort:</span>
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gray-400'
                >
                  <option value='newest'>Newest</option>
                  <option value='price-low'>Price: Low to High</option>
                  <option value='price-high'>Price: High to Low</option>
                  <option value='popular'>Most Popular</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {products.length > 0 ? (
              <div className='grid grid-cols-3 gap-6 mb-8'>
                {products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className='bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer group'
                  >
                    <div className='aspect-[3/4] overflow-hidden bg-gray-100'>
                      <img
                        src={
                          product.thumbnail ||
                          product.productResources?.find((r) => r.isPrimary)?.url ||
                          'https://via.placeholder.com/400'
                        }
                        alt={product.name}
                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                      />
                    </div>
                    <div className='p-4'>
                      <h3 className='font-semibold text-gray-900 mb-2 line-clamp-2'>{product.name}</h3>
                      <div className='flex items-center gap-2'>
                        <span className='text-lg font-bold text-gray-900'>{formatPriceToStr(product.price)} VNĐ</span>
                      </div>
                      {product.newArrival && (
                        <span className='inline-block mt-2 text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full'>
                          New Arrival
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-12'>
                <p className='text-gray-500 text-lg'>No products found</p>
              </div>
            )}

            {/* Pagination */}
            {meta && meta.pages > 1 && (
              <div className='flex justify-center items-center gap-2'>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className='p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  <ChevronLeft className='w-5 h-5' />
                </button>

                {[...Array(meta.pages)].map((_, index) => {
                  const page = index + 1
                  if (page === 1 || page === meta.pages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-lg font-semibold ${
                          currentPage === page ? 'bg-pink-600 text-white' : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <span key={page} className='px-2'>
                        ...
                      </span>
                    )
                  }
                  return null
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === meta.pages}
                  className='p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  <ChevronRight className='w-5 h-5' />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
