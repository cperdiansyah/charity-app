// export const { NEXT_PUBLIC_BASE_URL } = process.env

import { RequestInit } from "next/dist/server/web/spec-extension/request"

export const BASE_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': 'true',
}

export interface IFetchOptions extends RequestInit {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  mode: 'cors' | 'no-cors' | 'same-origin'
  credentials: 'same-origin' | 'include' | 'omit'
  headers: HeadersInit
  cache?: RequestCache
}

export const FETCH_OPTIONS: IFetchOptions = {
  method: 'GET', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, *cors, same-origin
  credentials: 'same-origin',
  headers: BASE_HEADERS,
}

export const SERVICE = {
  charity: '/api/v1/charity',
}
