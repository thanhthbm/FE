export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''
export const setAccessTokenToLs = (token: string) => localStorage.setItem('access_token', token)
export const clearAccessTokenFromLS = () => localStorage.removeItem('access_token')
