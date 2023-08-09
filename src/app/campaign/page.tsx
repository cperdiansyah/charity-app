import React from 'react'

import UserLayout from '@/components/templates/UserLayout'
import CampaignList from './CampaignList'
import SwiperBanner from './SwiperBanner'

import styles from './campaign.module.scss'
import ApprovalUser from './ApprovalUser'
import SedekahSubuh from './SedekahSubuh'

const UserDonation = () => {
  return (
    <UserLayout
      className="relative pt-[150px] md:pt-[150px] "
      headerColor="black"
    >
      <div className={`top-bg ${styles['campaign-page']}`}></div>
      <div className="container">
        <SwiperBanner className="mb-5" />
        <SedekahSubuh />
        <CampaignList />
        <ApprovalUser className="my-3" />
      </div>
    </UserLayout>
  )
}

export default UserDonation
