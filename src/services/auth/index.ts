import nookies from 'nookies'
import _ from 'lodash'
import { SERVICE, api } from 'utils/api'
import {
  IErrorResponse,
  IResponseDataAuth,
  ISubmitLoginForm,
  ISubmitSignupForm,
} from './index.interface'

export const loginService = async (
  formData: ISubmitLoginForm
): Promise<IResponseDataAuth | IErrorResponse> => {
  try {
    const resLogin = await api.post(SERVICE.login, {
      email: formData.username,
      password: formData.password,
      remember: formData.remember,
    })
    const dataLogin: IResponseDataAuth = _.get(resLogin, 'data', {
      accessToken: '',
      email: '',
      name: '',
      role: '',
    })

    nookies.destroy(null, 'token')
    nookies.set(
      null,
      'token',
      dataLogin.accessToken,
      nookies.set(null, 'token', dataLogin.accessToken, {
        path: '/',
      })
    )
    return dataLogin
  } catch (error) {
    const resError: IErrorResponse = _.get(error, 'response.data', {
      code: 400,
      massage: '',
    })

    return Promise.reject(resError)
  }
}

export const signupService = async (
  formData: ISubmitSignupForm
): Promise<IResponseDataAuth | IErrorResponse> => {
  try {
    const resSignup = await api.post(SERVICE.register, formData)
    const dataResponse: IResponseDataAuth = _.get(resSignup, 'data', {
      accessToken: '',
      email: '',
      name: '',
      role: '',
    })
    nookies.destroy(null, 'token')
    nookies.set(null, 'token', dataResponse.accessToken, {
      path: '/',
    })
    return dataResponse
  } catch (error) {
    const resError: IErrorResponse = _.get(error, 'response.data', {
      code: 400,
      massage: '',
    })

    return Promise.reject(resError)
  }
}
