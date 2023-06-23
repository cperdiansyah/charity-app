import { notify } from 'helpers/notify'
import _ from 'lodash'
import { usePathname, useRouter } from 'next/navigation'
import { logoutServices } from 'services/auth'
import { IErrorResponse } from 'services/auth/index.interface'
import useSpinnerLayout from 'stores/spinnerLayout'
import { NAVIGATION_LINK } from 'utils/link'

const useLogout = () => {
  const router = useRouter()
  const pathname = usePathname()

  const [, setSpinnerLayout] = useSpinnerLayout()

  const logout = async () => {
    setSpinnerLayout(true)

    try {
      const response = await logoutServices()
      console.log(response)
      if ('status' in response) {
        notify('success', 'Logout successful', '', 'bottomRight')
        setTimeout(() => {
          if (pathname !== NAVIGATION_LINK.Homepage)
            router.push(NAVIGATION_LINK.Homepage)
          router.refresh()
          return setSpinnerLayout(false)
          // return router.refresh()
        }, 500)
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
