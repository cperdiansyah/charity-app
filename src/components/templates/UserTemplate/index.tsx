import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import React from 'react'

const UserTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default UserTemplate