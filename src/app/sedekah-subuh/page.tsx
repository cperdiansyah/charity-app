'use client'

import React from 'react'

import UserLayout from '@/components/templates/UserLayout'

import styles from './sedekah-subuh.module.scss'
import SedekahSubuh from './SedekahSubuh'
import PoinInfo from './PoinInfo'

const UserDonation = () => {
  return (
    <UserLayout
      className="relative pt-[150px] md:pt-[150px] "
      headerColor="black"
    >
      <div className={`top-bg ${styles['campaign-page']}`}></div>
      <div className="container gap-2">
        <PoinInfo />
        <SedekahSubuh />
        {/* <SwiperBanner className="mb-5" />
        <SedekahSubuh />
        <CampaignList />
        <ApprovalUser className="my-3" /> */}
      </div>
    </UserLayout>
  )
}

export default UserDonation
