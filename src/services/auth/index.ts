import nookies from 'nookies'
import _ from 'lodash'
import { SERVICE } from '@/utils/api'
import { api } from '@/utils/clientSideFetch'

import {
  IErrorResponse,
  IResponseDataAuth,
  IResponseDefault,
  ISubmitLoginForm,
  ISubmitSignupForm,
} from './index.interface'
import { deleteCookie, setCookie } from 'cookies-next'

export const loginService = async (
  formData: ISubmitLoginForm
): Promise<IResponseDataAuth | IErrorResponse> => {
  try {
    const resLogin = await api
      .post(SERVICE.login, {
        email: formData.username,
        password: formData.password,
        remember: formData.remember,
      })
      .then((res) => {
        const { data } = res
        deleteCookie('token')
        setCookie('token', data.accessToken, {
          path: '/',
        })
        return data
      })

    return resLogin
  } catch (error) {
    deleteCookie('token')
    const resError: IErrorResponse = _.get(error, 'response.data', {
      code: 400,
      message: '',
    })

    return Promise.reject(resError)
  }
}

export const signupService = async (
  formData: ISubmitSignupForm
): Promise<IResponseDataAuth | IErrorResponse> => {
  try {
    const resSignup = await api.post(SERVICE.register, formData).then((res) => {
      const { data } = res
      deleteCookie('token')
      setCookie('token', data.accessToken, {
        path: '/',
      })
      return data
    })

    return resSignup
  } catch (error) {
    deleteCookie('token')
    const resError: IErrorResponse = _.get(error, 'response.data', {
      code: 400,
      message: '',
    })

    return Promise.reject(resError)
  }
}

export const logoutServices = async (): Promise<IResponseDefault> => {
  try {
    const resLogout = await api.post(SERVICE.logout).then((res) => {
      deleteCookie('token')
      return res.data
    })

    return resLogout
  } catch (error) {
    // nookies.destroy(null, 'token')
    deleteCookie('token')
    const resError: IErrorResponse = _.get(error, 'response.data', {
      code: 400,
      message: '',
    })

    return Promise.reject(resError)
  }
}

export const checkAccountService = async (formData: {
  email: string
}): Promise<IResponseDataAuth | IErrorResponse> => {
  try {
    const resLogin = await api
      .post(SERVICE.checkAccount, {
        email: formData.email,
      })
      .then((res) => {
        const { data } = res

        return data
      })

    return resLogin
  } catch (error) {
    const resError: IErrorResponse = _.get(error, 'response.data', {
      code: 400,
      message: '',
    })

    return Promise.reject(resError)
  }
}
export const resetPasswordService = async (formData: {
  email: string, 
  password: string
}): Promise<IResponseDataAuth | IErrorResponse> => {
  try {
    const resLogin = await api
      .post(SERVICE.resetPassword, {
        email: formData.email,
        newPassword: formData.password,
      })
      .then((res) => {
        const { data } = res

        return data
      })

    return resLogin
  } catch (error) {
    const resError: IErrorResponse = _.get(error, 'response.data', {
      code: 400,
      message: '',
    })

    return Promise.reject(resError)
  }
}
