export type methodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface IFetchOptions extends RequestInit {
  method: methodType
  mode: 'cors' | 'no-cors' | 'same-origin'
  credentials: 'same-origin' | 'include' | 'omit'
  headers: HeadersInit
  cache?: RequestCache
  withCredentials?: boolean
  // crossDomain: boolean
}

export type responseRefreshToken = {
  accessToken: string
}
