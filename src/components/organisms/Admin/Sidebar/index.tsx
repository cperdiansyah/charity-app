'use client'

import React, { useEffect, useState } from 'react'
import { Layout, Menu, MenuProps } from 'antd'
import { usePathname, useRouter } from 'next/navigation'

// Component
const { Sider } = Layout

// Custom hooks
import useScreenWidth from '@/hooks/useScreenWidth'
import useSidebarCollapsed from '@/stores/toogle'

// Utils, Interface, functions
import { IMenuItem } from './sidebar.interface'
import {
  findItemByKey,
  findItemByPathname,
  generateItem,
} from './sidebar.function'
import { adminSidebar, userVerfiedSidebar } from '@/utils/menu'

// styles
import styles from './sidebar.module.scss'
import { sidebarWidth } from '@/helpers'
import useUpdated from '@/hooks/useUpdated'
import useUserData from '@/stores/userData'

const AdminSidebar: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const screenWidth = useScreenWidth()
  const [collapsed, setCollapsed] = useSidebarCollapsed()
  const [activePathname, setActivePathname] = useState<string[]>(['1'])
  const [userData, setUserData] = useUserData()
  const item: IMenuItem[] =
    userData.role === 'admin' ? adminSidebar : userVerfiedSidebar
  const menuItems = generateItem(item)

  useEffect(() => {
    setActiveMenu()
  }, [])

  useUpdated(() => {
    setActiveMenu()
  }, [pathname])

  function setActiveMenu() {
    const item = findItemByPathname(menuItems, pathname)
    setActivePathname([item?.key])
  }
  const onClick: MenuProps['onClick'] = (e) => {
    const keyItem = e.key
    const item: IMenuItem = findItemByKey(menuItems, keyItem)
    if (item.pathname) {
      router.push(item.pathname)
    }
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
        defaultSelectedKeys={activePathname}
        items={menuItems}
        onClick={onClick}
        selectedKeys={activePathname}
      />
    </Sider>
  )
}

export default AdminSidebar
