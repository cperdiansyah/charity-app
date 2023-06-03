'use client'
import React from 'react'
import { Layout, theme } from 'antd'
import AdminSidebar from 'components/organisms/Admin/Sidebar'
// Components
import AdminHeader from 'components/organisms/Admin/Header'
import AdminFooter from 'components/organisms/Admin/Footer'

// styles
import styles from './adminLayout.module.scss'

const { Content } = Layout

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout className={`${styles['admin-layout']}`}>
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <Content style={{ margin: '10px 16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <AdminFooter />
      </Layout>
    </Layout>
  )
}

export default AdminLayout
