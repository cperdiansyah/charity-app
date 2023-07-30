import { notify } from '@/helpers/notify'
import { useRef } from 'react'
import _ from 'lodash'
import Cookies from 'next-cookies-universal'

import { usePathname, useRouter } from 'next/navigation'
import { logoutServices } from '@/services/auth'
import { IErrorResponse } from '@/services/auth/index.interface'
import useSpinnerLayout from '@/stores/spinnerLayout'
import { NAVIGATION_LINK } from '@/utils/link'
import useUserData from '@/stores/userData'
import useAuth from './useAuth'

const useLogout = () => {
  const router = useRouter()
  const pathname = usePathname()
  const token = useAuth()
  const cookies = Cookies('client')


  const isAuth = useRef<boolean>(false)

  const [, setSpinnerLayout] = useSpinnerLayout()
  const [, setUserData] = useUserData()

  if (_.isEmpty(token)) {
    isAuth.current = false
  } else {
    isAuth.current = true
  }

  const logout = async () => {
    setSpinnerLayout(true)

    try {
      if (isAuth.current) {
        const response = await logoutServices()
        // console.log(response)
        if ('status' in response) {
          notify('success', 'Logout successful', '', 'bottomRight')
          setUserData({
            email: '',
            id: '',
            is_verified: false,
            name: '',
            role: '',
          })
          setTimeout(() => {
            if (pathname !== NAVIGATION_LINK.Homepage)
              router.push(NAVIGATION_LINK.Homepage)
            router.refresh()
            return setSpinnerLayout(false)
            // return router.refresh()
          }, 1500)
        }
      } else {
        cookies.remove('token')
        setUserData({
          email: '',
          id: '',
          name: '',
          is_verified: false,
          role: ''
        })
      }
    } catch (error: any) {
      const resError: IErrorResponse = _.get(error, 'error', {
        code: 400,
        message: '',
      })
      notify('error', resError.message, '', 'bottomRight')
      if (resError.code === 401 || resError.code === 403) {
        setTimeout(() => {
          router.push(NAVIGATION_LINK.Homepage)
          setSpinnerLayout(false)
        }, 1500)
      } else {
        setSpinnerLayout(false)
      }
    }
  }

  return logout
}

export default useLogout
