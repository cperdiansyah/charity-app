import React from 'react'
import { IMenuItem, MenuItem } from './sidebar.interface'

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ElementType | null,
  children?: MenuItem[]
): MenuItem {
  const item: MenuItem = {
    key,
    children,
    label,
    icon: icon ? React.createElement(icon) : null,
  }

  return item
}

export const generateItem = (data: IMenuItem[], prefix = ''): MenuItem[] => {
  return data.map((item, index) => {
    const key = `${prefix}${index + 1}`
    const menuItem: MenuItem = getItem(item.label, key, item.icon)

    if (item.children) {
      menuItem.children = generateItem(item.children, `${key}-sub`)
    }

    return menuItem
  })
}
