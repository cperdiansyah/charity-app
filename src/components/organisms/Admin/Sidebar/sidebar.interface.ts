import { MenuProps, SiderProps } from 'antd'

export interface IAdminSidebar extends SiderProps {
  sidebarItem?: ISidebarItem[]
}

export interface ISidebarItem {
  icon: string
  label: string
}

export type MenuItem = Required<MenuProps>['items'][number] & {
  children?: MenuItem[]
}

export interface IMenuItem {
  label: string
  href?: string
  icon?: React.ElementType
  children?: IMenuItem[]
}