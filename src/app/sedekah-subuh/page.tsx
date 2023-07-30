import React from 'react'

import UserLayout from '@/components/templates/UserLayout'

import styles from './sedekah-subuh.module.scss'

const UserDonation = () => {
  return (
    <UserLayout
      className="relative pt-[90px] md:pt-[150px] "
      headerColor="black"
    >
      <div className={`top-bg ${styles['campaign-page']}`}></div>
      <div className="container">
        {/* <SwiperBanner className="mb-5" />
        <SedekahSubuh />
        <CampaignList />
        <ApprovalUser className="my-3" /> */}
      </div>
    </UserLayout>
  )
}

export default UserDonation
