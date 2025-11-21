import { Address } from '../types/address.type'
import http from '../utils/http'
import { ApiResponse } from './auth.api'

export const URL_BASE_ADDRESS = 'api/address'

export const addressApi = {
  createAddress: (body: Omit<Address, 'id'>) => http.post<ApiResponse<Address>>(URL_BASE_ADDRESS, body),
  getAddresses: () => http.get<ApiResponse<Address[]>>(URL_BASE_ADDRESS),
  updateAddress: (addressId: string, body: Omit<Address, 'id'>) =>
    http.put<ApiResponse<Address>>(URL_BASE_ADDRESS + '/' + addressId, body),
  deleteAddress: (addressId: string) => http.delete<ApiResponse<null>>(URL_BASE_ADDRESS + '/' + addressId),
  setDefault: (addressId: string) => http.put<ApiResponse<Address>>(`${URL_BASE_ADDRESS}/${addressId}/default`, {})
}
