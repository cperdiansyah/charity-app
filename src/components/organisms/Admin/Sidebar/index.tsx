import React from 'react'
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

// Custom hooks
import useScreenWidth from 'hooks/useScreenWidth'
import useSidebarCollapsed from 'stores/toogle'

// Utils, Interface, functions
import { IAdminSidebar, IMenuItem } from './sidebar.interface'
import { generateItem } from './sidebar.function'

// styles
import styles from './sidebar.module.scss'

export const item: IMenuItem[] = [
  {
    label: 'option 1',
    icon: PieChartOutlined,
  },
  {
    label: 'option 2',
    icon: DesktopOutlined,
  },
  {
    label: 'User',
    icon: UserOutlined,
    children: [{ label: 'Tom' }, { label: 'Bill' }, { label: 'Alex' }],
  },
  {
    label: 'Team',
    icon: TeamOutlined,
    children: [{ label: 'Team 1' }, { label: 'Team 2' }, { label: 'Team 3' }],
  },
  {
    label: 'Files',
    icon: FileOutlined,
  },
]

const menuItems = generateItem(item)

const AdminSidebar: React.FC = ({ sidebarItem }: IAdminSidebar) => {
  const screenWidth = useScreenWidth()
  const [collapsed, setCollapsed] = useSidebarCollapsed()
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    // setCurrent(e.key)
  }

  return (
    <Sider
      breakpoint="lg"
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
        defaultSelectedKeys={['4']}
        items={menuItems}
        onClick={onClick}
      />
    </Sider>
  )
}

export default AdminSidebar
