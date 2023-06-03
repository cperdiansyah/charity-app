'use client'

import React from 'react'
import { Layout, Menu, MenuProps } from 'antd'
import { useRouter } from 'next/navigation'

// Component
const { Sider } = Layout

// Custom hooks
import useScreenWidth from 'hooks/useScreenWidth'
import useSidebarCollapsed from 'stores/toogle'

// Utils, Interface, functions
import { IMenuItem } from './sidebar.interface'
import { findItemByKey, generateItem } from './sidebar.function'
import { adminSidebar } from 'utils/menu'

// styles
import styles from './sidebar.module.scss'

const item: IMenuItem[] = adminSidebar
const menuItems = generateItem(item)

const AdminSidebar: React.FC = () => {
  const router = useRouter()
  const screenWidth = useScreenWidth()
  const [collapsed, setCollapsed] = useSidebarCollapsed()
  const onClick: MenuProps['onClick'] = (e) => {
    const keyItem = e.key
    const item: IMenuItem = findItemByKey(menuItems, keyItem)
    if (item.pathname) {
      router.push(item.pathname)
    }
  }
  const sidebarWidth = () => {
    if (screenWidth > 0 && screenWidth < 700)
      return Math.floor(screenWidth * 0.4)
    return undefined
  }

  return (
    <Sider
      breakpoint="lg"
      width={sidebarWidth()}
      collapsedWidth={screenWidth > 700 || screenWidth === 0 ? undefined : 1}
      onBreakpoint={(broken) => {
        // console.log(broken)
      }}
      onCollapse={(collapsed, type) => {
        setCollapsed(collapsed)
      }}
      collapsible
      collapsed={collapsed}
    >
      <div className={`demo-logo-vertical ${styles['demo-logo-vertical']}`} />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={menuItems}
        onClick={onClick}
      />
    </Sider>
  )
}

export default AdminSidebar
