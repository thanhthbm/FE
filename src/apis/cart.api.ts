import { CartItem } from '../types/cartItem.type'
import http from '../utils/http'
import { UpdateQuantityDTO } from '../hooks/useCart'
import { ApiResponse } from './auth.api'

const URL_GET_CART = 'api/cart'
const URL_ADD_TO_CART = 'api/cart/add'
const URL_UPDATE_QUANTITY = 'api/cart/update'
const URL_DELETE_FROM_CART = 'api/cart'
const URL_CLEAR_CART = 'api/cart/clear'

export const cartApi = {
  getCart: () => http.get<ApiResponse<CartItem[]>>(URL_GET_CART),

  addToCart: (body: CartItem) => http.post<ApiResponse<CartItem[]>>(URL_ADD_TO_CART, body),

  // Sử dụng params của Axios để truyền query string (?quantity=...)
  updateQuantity: (dto: UpdateQuantityDTO) =>
    http.put<ApiResponse<CartItem[]>>(`${URL_UPDATE_QUANTITY}/${dto.variantId}`, null, {
      params: {
        quantity: dto.quantity
      }
    }),

  removeFromCart: (variantId: string) => http.delete<ApiResponse<CartItem[]>>(`${URL_DELETE_FROM_CART}/${variantId}`),

  clearCart: () => http.delete<ApiResponse<null>>(URL_CLEAR_CART)
}
