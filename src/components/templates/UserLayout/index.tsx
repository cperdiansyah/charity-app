'use client'
import { Spin } from 'antd'
import Footer from '@/components/organisms/Footer'
import Header from '@/components/organisms/Header'
import React from 'react'
import useSpinnerLayout from '@/stores/spinnerLayout'

const UserLayout = ({
  children,
  paddingTop,
  className,
  headerColor,
}: {
  children: React.ReactNode
  paddingTop?: number
  className?: string
  headerColor?: 'white' | 'black'
}) => {
  const [spinnerLayout, setSpinnerLayout] = useSpinnerLayout()
  return (
    <Spin spinning={spinnerLayout}>
      <Header headerColor={headerColor} />
      <div className={[className].join(' ')} style={{ paddingTop }}>
        {children}
      </div>
      <Footer />
    </Spin>
  )
}

export default UserLayout
