import React from 'react'
import nookies from 'nookies'

const useAuth = () => {
  const token = nookies.get(null, 'token') || null
  return token
}

export default useAuth
