import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import React from 'react'

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default UserLayout