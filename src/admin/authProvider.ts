import { AuthProvider } from 'react-admin'
import { getAccessTokenFromLS, clearAccessTokenFromLS } from '../utils/auth' // Tận dụng utils cũ [cite: 566]
import http from 'src/utils/http'

export const authProvider: AuthProvider = {
  login: ({ username, password }) => {
    const request = new Request('http://localhost:8080/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then(({ data }) => {
        localStorage.setItem('access_token', data.accessToken)
      })
  },
  logout: () => {
    clearAccessTokenFromLS()
    return Promise.resolve()
  },
  checkError: (error) => {
    const status = error.status
    if (status === 401 || status === 403) {
      clearAccessTokenFromLS()
      return Promise.reject()
    }
    return Promise.resolve()
  },
  checkAuth: () => {
    return getAccessTokenFromLS() ? Promise.resolve() : Promise.reject()
  },
  getPermissions: async () => {
    try {
      // 1. Gọi API lấy thông tin user hiện tại (nhờ token trong header)
      const { data } = await http.get('/api/user/profile')
      const userProfile = data.data

      const isAdmin = userProfile.authorityList.some((auth: any) => auth.roleCode === 'ADMIN')

      if (isAdmin) {
        return Promise.resolve('ADMIN')
      } else {
        return Promise.reject({ message: 'Bạn không có quyền truy cập Admin', status: 403 })
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
