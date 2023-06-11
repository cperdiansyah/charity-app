import { Layout } from 'antd'
import React from 'react'

const { Footer } = Layout

const AdminFooter = () => {
  const getYear = new Date().getFullYear()

  return (
    <Footer style={{ textAlign: 'center' }} className="text-sm">
      Amalkita ©{getYear} | All Right's Reserved
    </Footer>
  )
}

export default AdminFooter
