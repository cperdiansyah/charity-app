// export const { NEXT_PUBLIC_BASE_URL } = process.env
import axios from 'axios'
import nookies from 'nookies'
import { RequestInit } from 'next/dist/server/web/spec-extension/request'

const token = nookies.get(null, 'token') || null

export const BASE_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': 'true',
  Authorization: `Bearer ${token}`,
}

export interface IFetchOptions extends RequestInit {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  mode: 'cors' | 'no-cors' | 'same-origin'
  credentials: 'same-origin' | 'include' | 'omit'
  headers: HeadersInit
  cache?: RequestCache
  withCredentials: boolean
  // crossDomain: boolean
}

export const FETCH_OPTIONS: IFetchOptions = {
  method: 'GET', // *GET, POST, PUT, DELETE, etc.
  mode: 'same-origin', // no-cors, *cors, same-origin
  credentials: 'include',
  withCredentials: true,
  headers: BASE_HEADERS,
  // crossDomain: true,
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: BASE_HEADERS,
})

export const SERVICE = {
  charity: '/api/v1/charity',
  login: '/api/v1/auth/login',
  register: '/api/v1/auth/register',
  logout: '/api/v1/auth/logout',
  refreshToken: '/api/v1/auth/refresh',
}

// HTTP request post with fetch api

// export const fetchPost = async (url: string, bodyPayload: Object) => {
//   const response = await fetch(url, {
//     ...FETCH_OPTIONS,
//     method: 'POST',
//     body: JSON.stringify(bodyPayload),
//   })

//   return response
// }
