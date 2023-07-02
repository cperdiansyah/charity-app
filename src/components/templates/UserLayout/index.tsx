'use client'
import { Spin } from 'antd'
import Footer from '@/components/organisms/Footer'
import Header from '@/components/organisms/Header'
import React from 'react'
import useSpinnerLayout from '@/stores/spinnerLayout'

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const [spinnerLayout, setSpinnerLayout] = useSpinnerLayout()
  return (
    <Spin spinning={spinnerLayout}>
      <Header />
      {children}
      <Footer />
    </Spin>
  )
}

export default UserLayout
