import { Dayjs } from 'dayjs'

export type mediaContentSource = 'url' | 'upload'

export interface IFormCharity {
  loading: boolean
  form: any
  onFinish: VoidFunction
  onFinishFailed?: VoidFunction
  buttonSubmitText?: string
  initialValue?: initialValue

  //
  errorEditor?: boolean
}

export interface ICharityMedia {
  content: string
  content_type: 'image' | 'video'
}

interface initialValue {
  title: string
  target: number
  media: {
    media_content: string
  }
  media_source: string
  draft: boolean
  dateBanner?: string[] | Dayjs[]
  description: string
}
