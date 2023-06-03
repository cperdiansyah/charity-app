import { SiderProps } from 'antd'

export interface IAdminSidebar extends SiderProps {
  sidebarItem?: ISidebarItem[]
}

export interface ISidebarItem {
  icon: string
  label: string
}
