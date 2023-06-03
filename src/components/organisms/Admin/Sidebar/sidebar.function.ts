import React from 'react'
import { IMenuItem, MenuItem } from './sidebar.interface'
import {
  DesktopOutlined,
  DeploymentUnitOutlined,
  PictureOutlined,
  AuditOutlined,
  PrinterOutlined,
} from '@ant-design/icons'
import { NAVIGATION_LINK } from 'utils/link'

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ElementType | null,
  pathname?: string,
  children?: MenuItem[]
): MenuItem {
  const item: MenuItem = {
    key,
    children,
    label,
    pathname,
    icon: icon ? React.createElement(icon) : null,
  }

  return item
}

export const generateItem = (data: IMenuItem[], prefix = ''): MenuItem[] => {
  return data.map((item, index) => {
    const key = `${prefix}${index + 1}`
    const menuItem: MenuItem = getItem(
      item.label,
      key,
      item.icon,
      item.pathname
    )
    if (item.children) {
      menuItem.children = generateItem(item.children, `${key}-sub`)
    }

    return menuItem
  })
}

export function findItemByKey(data: any, key: string): any {
  for (let item of data) {
    if (item.key === key) {
      return item
    }
    if (item.children) {
      const foundItem = findItemByKey(item.children, key)
      if (foundItem) {
        return foundItem
      }
    }
  }
  return null
}

export const SidebarMenu = {
  dashboard: {
    label: 'Dashboard',
    icon: DesktopOutlined,
    pathname: NAVIGATION_LINK.Dashboard,
  },
  charity: {
    label: 'Charity',
    icon: DeploymentUnitOutlined,
    pathname: NAVIGATION_LINK.CharityList,
  },
  banner: {
    label: 'Banner',
    icon: PictureOutlined,
  },
  contentModeration: {
    label: 'Content Moderation',
    icon: AuditOutlined,
    children: [{ label: 'Charity' }, { label: 'User' }],
  },
  report: {
    label: 'Report',
    icon: PrinterOutlined,
    children: [{ label: 'Charity' }, { label: 'User' }],
  },
}

export const adminSidebar = [
  SidebarMenu.dashboard,
  SidebarMenu.charity,
  SidebarMenu.banner,
  SidebarMenu.contentModeration,
  SidebarMenu.report,
]

export const userVerfiedSidebar = [
  SidebarMenu.dashboard,
  SidebarMenu.charity,
  SidebarMenu.report,
]
