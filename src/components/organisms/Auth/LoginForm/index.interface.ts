export interface ISubmitLoginForm {
  username: string
  password: string
  remember?: boolean
}

export interface IErrorResponse {
  code: number
  massage: string
}

export interface IResponseDataLogin {
  accessToken: string
  email: string
  name: string
  role: string
}
