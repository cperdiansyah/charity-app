'use client'
import React, { useEffect, useRef } from 'react'
import { Layout, Spin, theme } from 'antd'
import AdminSidebar from '@/components/organisms/Admin/Sidebar'
import _isEmpty from 'lodash/isEmpty'

// Components
import AdminHeader from '@/components/organisms/Admin/Header'
import AdminFooter from '@/components/organisms/Admin/Footer'

// styles
import styles from './adminLayout.module.scss'
import useSpinnerLayout from '@/stores/spinnerLayout'
import HeaderBack from '@/components/molecules/Admin/HeaderBack'
import useUserData from '@/stores/userData'
import useUpdated from '@/hooks/useUpdated'
import { redirect, useRouter } from 'next/navigation'
import { NAVIGATION_LINK } from '@/utils/link'
import { notify } from '@/helpers/notify'
import useAuth from '@/hooks/useAuth'

const { Content } = Layout

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const token = useAuth()

  const [spinnerLayout, setSpinnerLayout] = useSpinnerLayout()
  const [userData, setUserData] = useUserData()
  const isAuth = useRef<boolean>(false)

  if (_isEmpty(token)) {
    isAuth.current = false
  } else {
    isAuth.current = true
  }

  useEffect(() => {
    if (!isAuth.current) {
      // return router.replace(NAVIGATION_LINK.Login)
      setTimeout(() => {
        return router.replace(NAVIGATION_LINK.Login)
      }, 1500)
    }
  }, [isAuth.current])

  useUpdated(() => {
    if (userData.id && isAuth.current) {
      if (!userData.is_verified && userData.role === 'user') {
        router.replace(NAVIGATION_LINK.Homepage)
        return notify('error', 'Unauthorized Access', '', 'bottomRight')
      }
    }

    if (!isAuth.current) {
      setTimeout(() => {
        return router.replace(NAVIGATION_LINK.Login)
      }, 1500)
    }
  }, [userData.id, isAuth.current])

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
