import { Dayjs } from 'dayjs'

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
  dateCampaign?: string[] | Dayjs[]
  description?: string
}
