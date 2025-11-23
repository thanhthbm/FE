import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { orderApi } from '../apis/order.api'
import useCart from './useCart'
import { CreateOrderRequest } from 'src/types/order.type'

export const useOrder = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { clearCart } = useCart()
  const [searchParams] = useSearchParams()

  const createOrderMutation = useMutation({
    mutationFn: (body: CreateOrderRequest) => orderApi.createOrder(body),
    onSuccess: (response) => {
      const data = response.data?.data

      clearCart()

      queryClient.invalidateQueries({ queryKey: ['orders'] })

      if (data?.paymentUrl) {
        window.location.href = data.paymentUrl
      } else {
        toast.success('Order placed successfully!')
        navigate('/profile/orders')
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to place order')
    }
  })

  const myOrdersQuery = useQuery({
    queryKey: ['orders'],
    queryFn: orderApi.getMyOrders,
    staleTime: 1000 * 60 * 5 // 5 phút
  })

  const vnpayVerifyQuery = useQuery({
    queryKey: ['vnpay-return', searchParams.toString()],

    queryFn: () => {
      return orderApi.vnpayReturn(searchParams.toString())
    },

    enabled: searchParams.has('vnp_SecureHash'),

    retry: false,
    staleTime: 0
  })

  const getOrderDetail = (orderId: string) => {
    return orderApi.getOrderDetail(orderId)
  }

  return {
    orders: myOrdersQuery.data?.data?.data || [],
    isLoadingOrders: myOrdersQuery.isLoading,

    createOrder: createOrderMutation.mutate,
    isCreatingOrder: createOrderMutation.isPending,
    verifyPayment: vnpayVerifyQuery.data?.data,
    isVerifyingPayment: vnpayVerifyQuery.isLoading,
    isVerifySuccess: vnpayVerifyQuery.isSuccess,
    isVerifyError: vnpayVerifyQuery.isError,

    getOrderDetail
  }
}
