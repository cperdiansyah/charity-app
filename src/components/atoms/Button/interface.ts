import { ButtonHTMLType } from 'antd/es/button'
import { BaseButtonProps } from 'antd/es/button/button'

export interface IPorps extends BaseButtonProps {
  children?: React.ReactNode
  className?: string
  buttontype?: 'default' | 'primary' | 'disabled' | 'outline' | 'transparent'
  href?: string
  onClick?: VoidFunction
  islink?: string | 'true' | boolean
  text?: string
  htmlType?: ButtonHTMLType
  style?: React.CSSProperties
}
