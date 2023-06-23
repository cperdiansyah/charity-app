import _ from 'lodash'
import { IFetchOptions } from './utils.interface'
import { getCookie } from 'cookies-next'

const token = getCookie('token') || null

export const SERVICE = {
  login: '/api/v1/auth/login',
  register: '/api/v1/auth/register',
  logout: '/api/v1/auth/logout',
  refreshToken: '/api/v1/auth/refresh',
  // Media Temp
  uploadMediaTemp: '/api/v1/media/upload',
  // Charity
  charity: '/api/v1/charity',
  detailCharity: '/api/v1/charity/:id',
  acceptCharity: '/api/v1/charity/:id/status',
  mediaUpload: '/api/v1/charity/upload',

  // Banner
  banner: '/api/v1/banner',
  detailBanner: '/api/v1/banner/:id',
  // acceptBanner: '/api/v1/banner/:id/status',
}

export const BASE_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': 'true',
  Authorization: `Bearer ${token}`,
  // accept: 'application/json',
}

export const FETCH_OPTIONS: IFetchOptions = {
  method: 'GET', // *GET, POST, PUT, DELETE, etc.
  mode: 'same-origin', // no-cors, *cors, same-origin
  credentials: 'include',
  withCredentials: true,
  headers: BASE_HEADERS,
  // crossDomain: true,
}
