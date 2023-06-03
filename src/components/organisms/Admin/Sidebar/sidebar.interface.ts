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
  pathname?: string
}

export interface IMenuItem {
  label: React.ReactNode | string
  pathname?: string
  icon?: React.ElementType
  children?: IMenuItem[]
}
