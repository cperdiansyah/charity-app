import nookies from 'nookies'
import axios from 'axios'
import _ from 'lodash'
import { BASE_HEADERS, SERVICE } from './api'
import { responseRefreshToken } from './utils.interface'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: BASE_HEADERS,
  withCredentials: true,
})

// Axios interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If the response status is 401 (Unauthorized), attempt to refresh the access token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshedToken: any = await clientRefreshToken()

        // Retry the original request with the new access token
        originalRequest.headers['Authorization'] = `Bearer ${refreshedToken}`
        return api(originalRequest)
      } catch (refreshError: any) {
        // Handle the error when refreshing the token

        throw refreshError
      }
    }

    // Return any other errors as they are
    return Promise.reject(error)
  }
)

export async function clientRefreshToken(
  isAnonymousToken: boolean = false
): Promise<responseRefreshToken> {
  try {
    const resRefresh = await api.post(SERVICE.refreshToken, {
      isAnonymous: isAnonymousToken,
    })

    const dataRefreshToken = _.get(resRefresh, 'data')

    nookies.destroy(null, 'token')
    nookies.set(null, 'token', dataRefreshToken.accessToken, {
      path: '/',
    })
    return dataRefreshToken.accessToken
  } catch (error: any) {
    return Promise.reject(error)
  }
}
