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

const { Header, Sider, Content } = Layout

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
            // style={{
            //   fontSize: '16px',
            //   width: 64,
            //   height: 64,
            // }}
          />
        )}
        <Breadcrumb
          items={[
            {
              title: 'Home',
            },
            {
              title: <a href="">Application Center</a>,
            },
            {
              title: <a href="">Application List</a>,
            },
            {
              title: 'An Application',
            },
          ]}
        />
      </div>
    </Header>
  )
}

export default AdminHeader
