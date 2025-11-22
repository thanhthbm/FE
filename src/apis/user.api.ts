import { UserProfile, UserProfileConfig } from 'src/types/user.type'
import { ApiResponse } from './auth.api'
import http from 'src/utils/http'

export const URL_USER_PROFILE = 'api/user/profile'

export const userApi = {
  getProfile: () => http.get<ApiResponse<UserProfile>>(URL_USER_PROFILE),
  updateProfile: (body: UserProfileConfig) => http.put<ApiResponse<UserProfile>>(URL_USER_PROFILE, body)
}
