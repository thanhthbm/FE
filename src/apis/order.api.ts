import { CreateOrderRequest, OrderDTO, OrderResponse, TransactionResult } from 'src/types/order.type'
import http from 'src/utils/http'
import { ApiResponse } from './auth.api'

export const URL_BASE_ORDER = 'api/order'

export const orderApi = {
  createOrder: (body: CreateOrderRequest) => http.post<ApiResponse<OrderResponse>>(URL_BASE_ORDER, body),
  getMyOrders: () => http.get<ApiResponse<OrderDTO[]>>(URL_BASE_ORDER),
  getOrderDetail: (orderId: string) => http.get<ApiResponse<OrderDTO>>(URL_BASE_ORDER + '/' + orderId),
  vnpayReturn: (queryString: string) => http.get<TransactionResult>(`api/payment/vnpay_return?${queryString}`)
}
