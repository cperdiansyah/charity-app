import React from 'react'
import AdminLayout from '@/components/templates/AdminLayout'

const AdminRootLayout = ({ children }: { children: React.ReactNode }) => {
  return <AdminLayout>{children}</AdminLayout>
}

export default AdminRootLayout
