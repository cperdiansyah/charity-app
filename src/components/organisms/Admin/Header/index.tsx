'use client'
import { Button, Layout, Menu, theme, Spin } from 'antd'
import type { MenuProps } from 'antd'
import React from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
// Components
import { DynamicBreadcrumbs } from 'components/molecules/DynamicBreadcrumb'

// custom hooks
import useScreenWidth from 'hooks/useScreenWidth'

// Global State
import useSidebarCollapsed from 'stores/toogle'
// utils
import { IMenuItem } from '../Sidebar/sidebar.interface'
import { findItemByKey } from '../Sidebar/sidebar.function'
// Styles
import styles from './header.module.scss'

const { Header } = Layout

const menuItems: MenuProps['items'] = [
  {
    label: 'Nama user',
    key: 'navigationHeader',
    icon: <UserOutlined />,
    children: [
      {
        key: 'setting',
        label: 'Settings',
        icon: <SettingOutlined />,
      },
      {
        key: 'logout',
        label: 'Logout',
        icon: <LogoutOutlined />,
      },
    ],
  },
]

const AdminHeader: React.FC = () => {
  const [collapsed, setCollapsed] = useSidebarCollapsed()
  const screenWidth = useScreenWidth()

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const onClick: MenuProps['onClick'] = (e) => {
    // console.log('click ', e)
    const keyItem = e.key

    const item: IMenuItem = findItemByKey(menuItems, keyItem)
    console.log(item)
    // setCurrent(e.key)
  }

  return (
    <Header
      style={{ background: colorBgContainer }}
      className={`header-container ${styles['header-container']}`}
    >
      <div className="header-left flex h-full items-center ">
        {screenWidth < 700 && (
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className={`collapsed-button ${styles['collapsed-button']}`}
          />
        )}
        <DynamicBreadcrumbs />
      </div>
      <div className="header-right flex h-full items-center lg:pl-5">
        <Menu
          onClick={onClick}
          selectable={false}
          mode="horizontal"
          items={menuItems}
        />
        {/* <Spin /> */}
      </div>
    </Header>
  )
}

export default AdminHeader
