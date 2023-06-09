export interface ISubmitSignupForm {
  username: string
  password: string
  name: string
  email: string
  // remember?: boolean
}

export interface IErrorResponse {
  code: number
  massage: string
}

export interface IResponseDataSignup {
  accessToken: string
  email: string
  name: string
  role: string
}
