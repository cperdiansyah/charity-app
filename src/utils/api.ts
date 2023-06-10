import nookies from 'nookies'
import _ from 'lodash'
import {
  IFetchOptions,
  methodType,
  responseRefreshToken,
} from './utils.interface'

const token = nookies.get(null, 'token') || null

export const SERVICE = {
  charity: '/api/v1/charity',
  login: '/api/v1/auth/login',
  register: '/api/v1/auth/register',
  logout: '/api/v1/auth/logout',
  refreshToken: '/api/v1/auth/refresh',
}

export const BASE_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': 'true',
  Authorization: `Bearer ${JSON.stringify(token)}`,
}

export const FETCH_OPTIONS: IFetchOptions = {
  method: 'GET', // *GET, POST, PUT, DELETE, etc.
  mode: 'same-origin', // no-cors, *cors, same-origin
  credentials: 'include',
  withCredentials: true,
  headers: BASE_HEADERS,
  // crossDomain: true,
}

export async function refreshToken(
  isAnonymousToken: boolean = false
  // req: Request
): Promise<responseRefreshToken> {
  try {
    const url = [process.env.NEXT_PUBLIC_BASE_URL, SERVICE.refreshToken].join(
      ''
    )

    const requestoption = {
      ...FETCH_OPTIONS,
      method: 'POST',
      body: JSON.stringify({
        isAnonymous: isAnonymousToken,
      }),
    }
    console.log(requestoption)

    const resRefresh = await fetch(url, requestoption)
    console.log(resRefresh)

    if (!resRefresh.ok) {
      throw new Error('Failed to refresh token')
    }

    const dataRefreshToken = await resRefresh.json()
    // console.log(dataRefreshToken)
    nookies.destroy(null, 'token')
    nookies.set(null, 'token', dataRefreshToken.accessToken)

    return dataRefreshToken.accessToken
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
  const accessToken = _.isEmpty(nookies.get(null, 'token'))
    ? token
    : nookies.get(null, 'token')

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

  // console.log(updatedOptions)
  try {
    const response = await fetch(url, updatedOptions)

    // const response = await fetchData(endpoint, updatedOptions)

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
