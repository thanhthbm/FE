import { LoginRequest, RegistrationRequest, RegistrationResponse, UserToken, VerifyRequest } from '../types/auth.type'
import http from '../utils/http'

export const URL_LOGIN = 'api/auth/login'
export const URL_REGISTER = 'api/auth/register'
export const URL_VERIFY = 'api/auth/verify'
export const URL_REFRESH = 'api/auth/refresh'

export interface ApiResponse<T> {
  statusCode: number
  status: string
  message?: string
  data?: T
}

const authApi = {
  registerAccount(body: RegistrationRequest) {
    return http.post<ApiResponse<RegistrationResponse>>(URL_REGISTER, body)
  },
  login(body: LoginRequest) {
    return http.post<ApiResponse<UserToken>>(URL_LOGIN, body)
  },
  verify(body: VerifyRequest) {
    return http.post<ApiResponse<null>>(URL_VERIFY, body)
  },
  refresh() {
    return http.post<ApiResponse<UserToken>>(URL_REFRESH, {}, { withCredentials: true })
  }
}

export default authApi
