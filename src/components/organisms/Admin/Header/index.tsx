'use client'
import { Breadcrumb, Button, Layout, theme } from 'antd'
import React from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

// custom hooks
import useScreenWidth from 'hooks/useScreenWidth'

// Global State
import useSidebarCollapsed from 'stores/toogle'

// Styles
import styles from './header.module.scss'
import { DynamicBreadcrumbs } from 'components/molecules/DynamicBreadcrumb'

const { Header } = Layout

const AdminHeader: React.FC = () => {
  const [collapsed, setCollapsed] = useSidebarCollapsed()
  const screenWidth = useScreenWidth()

  const {
    token: { colorBgContainer },
  } = theme.useToken()
  // console.log(colorBgContainer)
  return (
    <Header
      style={{ padding: 0, background: colorBgContainer }}
      className={`header-container ${styles['header-container']}`}
    >
      <div className="header-left flex h-full items-center lg:pl-5">
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
    </Header>
  )
}

export default AdminHeader
