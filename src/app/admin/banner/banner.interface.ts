// import { FormContextProps } from "antd/es/form/context"

import { Dayjs } from 'dayjs'

export type mediaContentSource = 'url' | 'upload'

export interface IFormBanner {
  loading: boolean
  form: any
  onFinish: VoidFunction
  buttonSubmitText?: string
  initialValue?: initialValue
}

export interface initialValue {
  title: string
  redirection_link: string
  media: {
    media_content: string
  }
  status: boolean
  dateBanner?: string[] | Dayjs[]
}

export interface IFormAddBanner {}
