import api from '../api/axiosInstance.js'

export const TOKEN_KEY = 'token'

// NOT: backend token'i "Bearer" oneki olmadan bekliyor
export function setAuthHeader(token) {
  if (token) {
    api.defaults.headers.common.Authorization = token
  } else {
    delete api.defaults.headers.common.Authorization
  }
}

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}
