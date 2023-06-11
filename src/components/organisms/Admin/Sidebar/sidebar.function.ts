import React from 'react'
import { IMenuItem, MenuItem } from './sidebar.interface'

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

export function findItemByPathname(data: any, pathname: string): any {
  for (let item of data) {
    if (item.pathname === pathname) {
      return item
    }
    if (item.children) {
      const foundItem = findItemByKey(item.children, pathname)
      if (foundItem) {
        return foundItem
      }
    }
  }
  return null
}
