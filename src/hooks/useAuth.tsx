import React from 'react'
import { getCookie } from 'cookies-next'

const useAuth = () => {
  const token = getCookie('token') || null
  return token
}

export default useAuth
