// import { FormContextProps } from "antd/es/form/context"

import { ModalFuncProps } from 'antd'
import { Dayjs } from 'dayjs'
import { Dispatch, SetStateAction } from 'react'

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

export interface IModalTable extends ModalFuncProps {
  open: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
  data: any
  setData?: any
}
