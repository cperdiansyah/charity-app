// import { Layout } from 'antd'
import React, { useState, useEffect } from 'react'
import { Layout, Menu, MenuProps } from 'antd'
import {
  UserOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
} from '@ant-design/icons'
// Component
const { Sider } = Layout
// Interafce
import { IAdminSidebar, ISidebarItem } from './sidebar.interface'

import styles from './sidebar.module.scss'
import useScreenWidth from 'hooks/useScreenWidth'
import useSidebarCollapsed from 'stores/toogle'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [
    getItem('Team 1', '6'),
    getItem('Team 2', '8'),
  ]),
  getItem('Files', '9', <FileOutlined />),
]

const AdminSidebar: React.FC = ({ sidebarItem }: IAdminSidebar) => {
  const screenWidth = useScreenWidth()
  // const [collapsed, setCollapsed] = useState(false)
  const [collapsed, setCollapsed] = useSidebarCollapsed()

  useEffect(() => {
    return () => {
      screenWidth
    }
  }, [screenWidth])
  // console.log(screenWidth)

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth={screenWidth > 700 || screenWidth === 0 ? undefined : 1}
      onBreakpoint={(broken) => {
        // console.log(broken)
      }}
      onCollapse={(collapsed, type) => {
        setCollapsed(collapsed)
        // console.log(collapsed, type)
      }}
      collapsible
      collapsed={collapsed}
      // onCollapse={(value) => setCollapsed(value)}
    >
      <div className={`demo-logo-vertical ${styles['demo-logo-vertical']}`} />
      {/* <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['4']}
        items={[
          UserOutlined,
          VideoCameraOutlined,
          UploadOutlined,
          UserOutlined,
        ].map((icon, index) => ({
          key: String(index + 1),
          icon: React.createElement(icon),
          label: `nav ${index + 1}`,
        }))}
      /> */}
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['4']}
        items={items}
      />
    </Sider>
  )
}

export default AdminSidebar
