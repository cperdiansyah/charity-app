export interface IPorps {
  children?: React.ReactNode
  className?: string
  type?: 'default' | 'primary' | 'disabled' | 'outline' | 'transparent'
  href?: string
  onClick?: VoidFunction
  isLink?: boolean
  text?: string
}
