import { data } from 'react-router-dom'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { wishlistApi } from '../apis/wishlist.api'
import { AxiosResponse } from 'axios'
import { ApiResponse } from '../apis/auth.api'
import { Product } from '../types/product.type'
import { string } from 'yup'
import { toast } from 'react-toastify'
export const useWishList = () => {
  const key = ['wishlist']
  const queryClient = useQueryClient()

  const wishlistQuery = useQuery<AxiosResponse<ApiResponse<Product[]>>>({
    queryKey: key,
    queryFn: wishlistApi.getWishList
  })

  const wishlistItems = wishlistQuery.data?.data.data || []
  const wishlistCount = wishlistItems.length

  const isInWishList = (productId: string) => wishlistItems.some((item) => item.id === productId)

  const toggleMutation = useMutation({
    mutationFn: (productId: string) => wishlistApi.toggleWishList(productId),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: key })

      const message = response.data.message || 'Success'
      if (message.toLowerCase().includes('added')) {
        toast.success(message)
      } else {
        toast.info(message)
      }
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update wishlist')
    }
  })

  return {
    wishlistItems,
    wishlistCount,
    isLoading: wishlistQuery.isLoading,
    isError: wishlistQuery.isError,
    isInWishList,
    toggleWishList: toggleMutation.mutate,
    isToggling: toggleMutation.isPending
  }
}
