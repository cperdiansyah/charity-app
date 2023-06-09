export interface ISubmitLoginForm {
  username: string
  password: string
  remember?: boolean
}

export interface ISubmitSignupForm {
  username: string
  password: string
  name: string
  email: string
}

export interface IErrorResponse {
  code: number
  massage: string
}

export interface IResponseDataAuth {
  accessToken: string
  email: string
  name: string
  role: string
}
