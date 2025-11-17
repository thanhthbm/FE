import React, { useState } from 'react'
import { Heart, Minus, Plus, ChevronDown, ShoppingCart } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { productApi } from '../../apis/product.api'
import { formatPriceToStr } from '../../utils/format'

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>()
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  // Fetch product data
  const productQuery = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productApi.getProductById(productId as string),
    enabled: !!productId
  })

  const product = productQuery.data

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const uniqueColors = product?.variants
    ? [...new Set(product.variants.map((v) => v.color).filter((c): c is string => !!c))]
    : []

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const uniqueSizes = product?.variants
    ? [...new Set(product.variants.map((v) => v.size).filter((s): s is string => !!s))]
    : []

  const images = product?.productResources
    ? product.productResources
        .filter((r) => r.type === 'image' && r.url)
        .sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0))
        .map((r) => r.url as string)
    : []

  React.useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      if (!selectedColor && uniqueColors.length > 0) setSelectedColor(uniqueColors[0])
      if (!selectedSize && uniqueSizes.length > 0) setSelectedSize(uniqueSizes[0])
    }
  }, [product, uniqueColors, uniqueSizes, selectedColor, selectedSize])

  // Get available stock for selected variant
  const selectedVariant = product?.variants?.find((v) => v.color === selectedColor && v.size === selectedSize)

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase' && selectedVariant?.stockQuantity && quantity < selectedVariant.stockQuantity) {
      setQuantity(quantity + 1)
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  if (productQuery.isLoading) {
    return (
      <div className='bg-white min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-pink-600 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading product...</p>
        </div>
      </div>
    )
  }

  if (productQuery.error || !product) {
    return (
      <div className='bg-white min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-red-600 text-xl'>Failed to load product</p>
          <button onClick={() => window.location.reload()} className='mt-4 px-6 py-2 bg-pink-600 text-white rounded-lg'>
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-white min-h-screen'>
      <div className='container mx-auto px-6 py-8'>
        <div className='grid grid-cols-2 gap-12'>
          {/* Left Side - Images */}
          <div>
            {/* Main Image */}
            <div className='bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-[3/4]'>
              {images.length > 0 ? (
                <img src={images[selectedImageIndex]} alt={product.name} className='w-full h-full object-cover' />
              ) : product.thumbnail ? (
                <img src={product.thumbnail} alt={product.name} className='w-full h-full object-cover' />
              ) : (
                <div className='w-full h-full flex items-center justify-center text-gray-400'>No image available</div>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 0 && (
              <div className='grid grid-cols-4 gap-4'>
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index ? 'border-pink-600' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className='w-full h-full object-cover' />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Product Info */}
          <div>
            {/* Brand */}
            {product.brand && <p className='text-sm text-gray-600 mb-2'>BY {product.brand.toUpperCase()}</p>}

            {/* Product Name */}
            <h1 className='text-4xl font-bold text-gray-900 mb-4'>{product.name}</h1>

            {/* Rating */}
            {product.rating && (
              <div className='flex items-center gap-2 mb-6'>
                <div className='flex text-pink-600'>
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating!) ? 'fill-current' : 'fill-none stroke-current'}`}
                      viewBox='0 0 20 20'
                    >
                      <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
                    </svg>
                  ))}
                </div>
                <span className='text-gray-600'>({product.rating.toFixed(1)})</span>
              </div>
            )}

            {/* Price */}
            <p className='text-4xl font-bold text-pink-600 mb-8'>{formatPriceToStr(product.price)} VNĐ</p>

            {/* New Arrival Badge */}
            {product.newArrival && (
              <div className='inline-block bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-semibold mb-6'>
                New Arrival
              </div>
            )}

            {/* Color Selection */}
            {uniqueColors.length > 0 && (
              <div className='mb-6'>
                <p className='font-semibold mb-3'>
                  Color: <span className='font-normal capitalize'>{selectedColor}</span>
                </p>
                <div className='flex gap-3'>
                  {uniqueColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 capitalize ${
                        selectedColor === color
                          ? 'border-pink-600 bg-pink-50 text-pink-600'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {uniqueSizes.length > 0 && (
              <div className='mb-6'>
                <div className='flex justify-between items-center mb-3'>
                  <p className='font-semibold'>Size</p>
                </div>
                <div className='flex gap-3'>
                  {uniqueSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-lg border-2 font-medium ${
                        selectedSize === size
                          ? 'bg-pink-100 border-pink-600 text-pink-600'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Status */}
            {selectedVariant &&
              selectedVariant.stockQuantity !== null &&
              selectedVariant.stockQuantity !== undefined && (
                <div className='mb-4'>
                  <p className={`text-sm ${selectedVariant.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedVariant.stockQuantity > 0
                      ? `In Stock (${selectedVariant.stockQuantity} available)`
                      : 'Out of Stock'}
                  </p>
                </div>
              )}

            {/* Quantity */}
            {selectedVariant && selectedVariant.stockQuantity && selectedVariant.stockQuantity > 0 && (
              <div className='mb-8'>
                <p className='font-semibold mb-3'>Quantity</p>
                <div className='flex items-center gap-4'>
                  <div className='flex items-center border border-gray-300 rounded-lg'>
                    <button
                      onClick={() => handleQuantityChange('decrease')}
                      className='p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                      disabled={quantity <= 1}
                    >
                      <Minus className='w-5 h-5' />
                    </button>
                    <span className='px-6 font-semibold'>{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange('increase')}
                      className='p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                      disabled={quantity >= selectedVariant.stockQuantity}
                    >
                      <Plus className='w-5 h-5' />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Add to Cart & Wishlist */}
            <div className='flex gap-4 mb-8'>
              <button
                className='flex-1 bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed'
                disabled={!selectedVariant || !selectedVariant.stockQuantity || selectedVariant.stockQuantity === 0}
              >
                <ShoppingCart className='w-5 h-5' />
                Add to Cart
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  isFavorite ? 'border-pink-600 bg-pink-50' : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-pink-600 text-pink-600' : 'text-gray-600'}`} />
              </button>
            </div>

            {/* Product Description */}
            {product.description && (
              <div className='border-t border-gray-200 pt-6'>
                <button className='w-full flex justify-between items-center py-4 text-left'>
                  <span className='font-semibold text-lg'>Product Description</span>
                  <ChevronDown className='w-5 h-5' />
                </button>
                <div className='pb-4 text-gray-600 leading-relaxed'>
                  <p>{product.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
