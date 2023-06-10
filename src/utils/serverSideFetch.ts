import nookies from 'nookies'
import _ from 'lodash'
import {
  IFetchOptions,
  methodType,
  responseRefreshToken,
} from './utils.interface'
import { cookies } from 'next/headers'
import { FETCH_OPTIONS, SERVICE } from './api'
// import { NextRequest, NextResponse } from 'next/server'
import { setCookie, getCookie, deleteCookie } from 'cookies-next'

export async function refreshToken(
  isAnonymousToken: boolean = false
  // req: Request
): Promise<responseRefreshToken> {
  try {
    const cookieStore = cookies()
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
      throw new Error('Failed to refresh token')
    }

    const dataRefreshToken = await resRefresh.json()
    const refreshedToken = dataRefreshToken.accessToken

    deleteCookie('token')
    setCookie('token', refreshedToken, {
      path: '/',
    })

    return refreshedToken
  } catch (error: any) {
    console.error(error)
    return error
  }
}

// Fetch interceptor function
export async function nextFetch(
  endpoint: string,
  options?: RequestInit,
  method?: methodType,
  token?: string
) {
  const url = [process.env.NEXT_PUBLIC_BASE_URL, endpoint].join('')
  // const accessToken = localStorage.getItem('accessToken')
  const accessToken = _.isEmpty(getCookie('token')) ? token : getCookie('token')

  const requestOptions = options || FETCH_OPTIONS

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
    const response = await fetch(url, updatedOptions)

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

      return fetch(url, retryOptions)
    }

    return response
  } catch (error) {
    // Handle any other errors here
    console.error('Request error:', error)
    throw error
  }
}

export const fetchData = async (
  endpoint: string,
  init: IFetchOptions = FETCH_OPTIONS,
  method?: methodType
) => {
  try {
    const res = await fetch(
      `${[process.env.NEXT_PUBLIC_BASE_URL, endpoint].join('')}`,
      {
        ...init,
        method: method || 'GET',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Process the response data
        // console.log(data)
        return data
      })
    return res
  } catch (error) {
    console.error(error)
  }
}
