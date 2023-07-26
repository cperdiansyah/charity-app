'use client'
import React, { useEffect } from 'react'
import { Layout, Spin, theme } from 'antd'
import AdminSidebar from '@/components/organisms/Admin/Sidebar'
// Components
import AdminHeader from '@/components/organisms/Admin/Header'
import AdminFooter from '@/components/organisms/Admin/Footer'

// styles
import styles from './adminLayout.module.scss'
import useSpinnerLayout from '@/stores/spinnerLayout'
import HeaderBack from '@/components/molecules/Admin/HeaderBack'
import useUserData from '@/stores/userData'
import useUpdated from '@/hooks/useUpdated'
import { useRouter } from 'next/navigation'
import { NAVIGATION_LINK } from '@/utils/link'
import { notify } from '@/helpers/notify'

const { Content } = Layout

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  const [spinnerLayout, setSpinnerLayout] = useSpinnerLayout()
  const [userData, setUserData] = useUserData()

  useUpdated(() => {
    if (userData.id) {
      if (!userData.is_verified && userData.role === 'user') {
        router.replace(NAVIGATION_LINK.Homepage)
        return notify('error', 'Unauthorized Access', '', 'bottomRight')
      }
    }
  }, [userData.id])

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
