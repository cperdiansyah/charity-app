// 'use server'
import _ from 'lodash'
import { methodType, responseRefreshToken } from './utils.interface'
import { cookies } from 'next/headers'
import { FETCH_OPTIONS, SERVICE } from './api'
import Cookies from 'next-cookies-universal'
import { setCookie, getCookie, deleteCookie } from 'cookies-next'

export const fetchData = async (
  url: string,
  init: RequestInit,
  method?: methodType
) => {
  try {
    const response = await fetch(url, {
      ...init,
      method: method || 'GET',
    })

    if (!response.ok) {
      return response
    }

    const data = await response.json()
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

// Fetch with interceptor function
export async function nextFetch({
  endpoint,
  options,
  method,
  token,
}: {
  endpoint: string
  options?: RequestInit
  method?: methodType
  token?: string
}) {
  const cookies = Cookies('server')
  const myToken = cookies.get('token')

  const url = [process.env.NEXT_PUBLIC_BASE_URL, endpoint].join('')
  // const accessToken = localStorage.getItem('accessToken')
  const accessToken = _.isEmpty(myToken) ? token : myToken

  // const requestOptions = options || FETCH_OPTIONS
  const requestOptions = {
    ...FETCH_OPTIONS,
    ...options,
  }

  // If the access token is not present, throw an error or handle as per your requirement
  if (!accessToken) {
    throw new Error('Access token not found')
  }
  const updatedOptions = {
    ...requestOptions,
    method: method || 'GET',
    headers: {
      ...requestOptions?.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  }
  try {
    const response = await fetchData(url, updatedOptions)
    // If the response status is 401 (Unauthorized), attempt to refresh the access token
    if (response.status === 401) {
      const refreshedToken = await refreshToken()

      // Retry the original request with the new access token
      const retryOptions = {
        ...requestOptions,
        method: method || 'GET',
        headers: {
          ...requestOptions?.headers,
          Authorization: `Bearer ${refreshedToken}`,
        },
      }

      return fetchData(url, retryOptions)
    }

    return response
  } catch (error) {
    // Handle any other errors here
    console.error('Request error:', error)
    throw error
  }
}

export async function refreshToken(
  isAnonymousToken: boolean = false
): Promise<responseRefreshToken> {
  try {
    // const cookieStore = cookies()
    const url = [process.env.NEXT_PUBLIC_BASE_URL, SERVICE.refreshToken].join(
      ''
    )

    const requestoption = {
      ...FETCH_OPTIONS,
      method: 'POST',
      body: JSON.stringify({
        isAnonymous: isAnonymousToken,
      }),
      headers: {
        ...FETCH_OPTIONS.headers,
        Cookie: cookies()
          .getAll()
          .map(({ name, value }) => `${name}=${value}`)
          .join('; '),
      },
    }
    const resRefresh = await fetch(url, requestoption)

    if (!resRefresh.ok) {
      throw Error('Failed to refresh token')
    }

    const dataRefreshToken = await resRefresh.json()
    const refreshedToken = dataRefreshToken.accessToken

    deleteCookie('token')
    setCookie('token', refreshedToken, {
      path: '/',
    })

    return refreshedToken
  } catch (error: any) {
    // console.error(error)
    // return error
    return Promise.reject(error)
  }
}
