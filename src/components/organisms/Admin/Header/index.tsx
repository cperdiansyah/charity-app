'use client'
import _ from 'lodash'
import React from 'react'
import { Button, Layout, Menu, theme } from 'antd'
import type { MenuProps } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons'

// Components
import { DynamicBreadcrumbs } from 'components/molecules/DynamicBreadcrumb'

// custom hooks
import useScreenWidth from 'hooks/useScreenWidth'
import useUserData from 'stores/userData'

// Global State
import useSidebarCollapsed from 'stores/toogle'

// Styles
import styles from './header.module.scss'
import useLogout from 'hooks/useLogout'

const { Header } = Layout

const AdminHeader: React.FC = () => {
  const [collapsed, setCollapsed] = useSidebarCollapsed()
  const screenWidth = useScreenWidth()
  const logoutHooks = useLogout()
  const [userData, setUserData] = useUserData()

  const menuItems: MenuProps['items'] = [
    {
      label: `${userData.name.split(' ')[0]}`,
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

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const onClick: MenuProps['onClick'] = (e) => {
    const keyItem = e.key
    if (keyItem === 'logout') {
      handleLogout()
    }
  }

  const handleLogout = async () => {
    await logoutHooks()
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
          className="w-full"
        />
      </div>
    </Header>
  )
}

export default AdminHeader
