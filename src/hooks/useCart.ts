import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { cartApi } from '../apis/cart.api'
import { CartItem } from '../types/cartItem.type'
import { toast } from 'react-toastify'
import { AxiosResponse } from 'axios'
import { ApiResponse } from '../apis/auth.api'

export type UpdateQuantityDTO = {
  variantId: string
  quantity: number
}

const useCart = () => {
  const queryClient = useQueryClient()
  const KEY = ['cart']

  const cartQuery = useQuery<AxiosResponse<ApiResponse<CartItem[]>>>({
    queryKey: KEY,
    queryFn: cartApi.getCart,
    staleTime: 1000 * 60 * 10,
    retry: 1
  })

  const cartItems = cartQuery.data?.data?.data || []

  const updateCartCache = (newCartData: CartItem[]) => {
    queryClient.setQueryData<AxiosResponse<ApiResponse<CartItem[]>>>(KEY, (oldData) => {
      if (!oldData) return undefined

      return {
        ...oldData,
        data: {
          ...oldData.data,
          data: newCartData
        }
      }
    })
  }

  const addToCartMutation = useMutation({
    mutationFn: (item: CartItem) => cartApi.addToCart(item),
    onSuccess: (response) => {
      updateCartCache(response.data?.data || [])
      toast.success('Added to cart')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to add to cart')
    }
  })

  const updateQuantityMutation = useMutation({
    mutationFn: (dto: UpdateQuantityDTO) => cartApi.updateQuantity(dto),
    onSuccess: (response) => {
      updateCartCache(response.data?.data || [])
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update quantity')
    }
  })

  const removeMutation = useMutation({
    mutationFn: (variantId: string) => cartApi.removeFromCart(variantId),
    onSuccess: (response) => {
      updateCartCache(response.data?.data || [])
      toast.info('Removed product')
    }
  })

  const clearMutation = useMutation({
    mutationFn: cartApi.clearCart,
    onSuccess: () => {
      // Khi clear thì set mảng rỗng
      updateCartCache([])
    }
  })

  const totalQuantity = cartItems.reduce((acc: number, item: CartItem) => acc + item.quantity, 0)
  const totalPrice = cartItems.reduce((acc: number, item: CartItem) => acc + item.price * item.quantity, 0)

  return {
    cartItems,
    totalQuantity,
    totalPrice,
    isLoading: cartQuery.isLoading,
    isError: cartQuery.isError,

    addToCart: addToCartMutation.mutate,
    updateQuantity: updateQuantityMutation.mutate,
    removeFromCart: removeMutation.mutate,
    clearCart: clearMutation.mutate,

    isAdding: addToCartMutation.isPending,
    isUpdating: updateQuantityMutation.isPending,
    isRemoving: removeMutation.isPending,
    isClearing: clearMutation.isPending
  }
}

export default useCart
