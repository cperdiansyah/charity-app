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

export interface IErrorResponse extends IResponseDefault {
  code: number
  message: string
}

export interface IResponseDataAuth {
  accessToken: string
  email: string
  name: string
  role: string
}

export interface IResponseDefault {
  code: number
  message: string
}
