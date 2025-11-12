import { LoginRequest, RegistrationRequest, RegistrationResponse, UserToken, VerifyRequest } from '../types/auth.type'
import http from '../utils/http'

export const URL_LOGIN = 'api/auth/login'
export const URL_REGISTER = 'api/auth/register'
export const URL_VERIFY = 'api/auth/verify'

const authApi = {
  registerAccount(body: RegistrationRequest) {
    return http.post<RegistrationResponse>(URL_REGISTER, body)
  },
  login(body: LoginRequest) {
    return http.post<UserToken>(URL_LOGIN, body)
  },
  verify(body: VerifyRequest) {
    return http.post(URL_VERIFY, body)
  }
}
