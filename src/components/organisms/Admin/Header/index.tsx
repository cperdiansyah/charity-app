'use client'
import { Breadcrumb, Button, Layout, theme } from 'antd'
import React, { useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

// Global State
import useSidebarCollapsed from 'stores/toogle'

const { Header, Sider, Content } = Layout
const AdminHeader: React.FC = () => {
  const [collapsed, setCollapsed] = useSidebarCollapsed()

  const {
    token: { colorBgContainer },
  } = theme.useToken()
  // console.log(colorBgContainer)
  return (
    <Header
      style={{ padding: 0, background: colorBgContainer }}
      className="header-container"
    >
      <div className="header-left flex items-center">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
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
