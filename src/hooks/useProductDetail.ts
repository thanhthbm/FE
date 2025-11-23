import { useState, useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { productApi } from '../apis/product.api'

export const useProductDetail = () => {
  const { productId } = useParams<{ productId: string }>()

  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const productQuery = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productApi.getProductById(productId as string),
    enabled: !!productId
  })

  const product = productQuery.data

  const uniqueColors = useMemo(
    () => (product?.variants ? [...new Set(product.variants.map((v) => v.color).filter((c): c is string => !!c))] : []),
    [product]
  )

  const uniqueSizes = useMemo(
    () => (product?.variants ? [...new Set(product.variants.map((v) => v.size).filter((s): s is string => !!s))] : []),
    [product]
  )

  const images = useMemo(
    () =>
      product?.productResources
        ? product.productResources
            .filter((r) => r.type === 'image' && r.url)
            .sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0))
            .map((r) => r.url as string)
        : [],
    [product]
  )

  useEffect(() => {
    window.scrollTo(0, 0)
    if (product && product.variants && product.variants.length > 0) {
      if (!selectedColor && uniqueColors.length > 0) setSelectedColor(uniqueColors[0])
      if (!selectedSize && uniqueSizes.length > 0) setSelectedSize(uniqueSizes[0])
    }
  }, [product, uniqueColors, uniqueSizes, selectedColor, selectedSize])

  const selectedVariant = useMemo(
    () => product?.variants?.find((v) => v.color === selectedColor && v.size === selectedSize),
    [product, selectedColor, selectedSize]
  )

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase' && selectedVariant?.stockQuantity && quantity < selectedVariant.stockQuantity) {
      setQuantity((prev) => prev + 1)
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  return {
    product,
    isLoading: productQuery.isLoading,
    isError: productQuery.isError,

    images,
    uniqueColors,
    uniqueSizes,
    selectedVariant,

    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    quantity,
    setQuantity,
    handleQuantityChange,
    selectedImageIndex,
    setSelectedImageIndex
  }
}
