import { ModalFuncProps } from 'antd'
import { Dayjs } from 'dayjs'
import { Dispatch, SetStateAction } from 'react'


export type mediaContentSource = 'url' | 'upload'

export interface IFormCharity {
  loading: boolean
  form: any
  onFinish: VoidFunction
  onFinishFailed?: VoidFunction
  buttonSubmitText?: string
  initialValue?: InitialValue

  //
  errorEditor?: boolean
}

export interface ICharityMedia {
  content: string
  content_type: 'image' | 'video'
}

export interface InitialValue {
  title: string
  target: number
  media: {
    media_content: string
  }
  media_source?: string
  draft: boolean
  
}

export interface ICampaignData {
  _id: string
  title: string
  slug: string
  description: string
  status: string
  is_draft: boolean
  donation_target: number
  start_date: string
  end_date: string
  post_date: any
  author: Author
  media: Medum[]
  campaign_type: string
  createdAt: string
  updatedAt: string
}

export interface Author {
  _id: string
  name: string
}

export interface Medum {
  content: string
  content_type: string
  _id: string
}


export interface IModalTable extends ModalFuncProps {
  open: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
  data: any
  setData?: any
}