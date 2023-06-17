'use client'
import React from 'react'
import { Layout, Spin, theme } from 'antd'
import AdminSidebar from 'components/organisms/Admin/Sidebar'
// Components
import AdminHeader from 'components/organisms/Admin/Header'
import AdminFooter from 'components/organisms/Admin/Footer'

// styles
import styles from './adminLayout.module.scss'
import useSpinnerLayout from 'stores/spinnerLayout'
import HeaderBack from 'components/molecules/Admin/HeaderBack'

const { Content } = Layout

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [spinnerLayout, setSpinnerLayout] = useSpinnerLayout()

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Spin spinning={spinnerLayout}>
      <Layout className={`${styles['admin-layout']}`}>
        <AdminSidebar />
        <Layout>
          <AdminHeader />
          <HeaderBack style={{ margin: '5px 16px', marginTop: '15px' }} />
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
    </Spin>
  )
}

export default AdminLayout
