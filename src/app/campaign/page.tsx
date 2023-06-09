import React from 'react'
import _ from 'lodash'
import UserLayout from '@/components/templates/UserLayout'

import CampaignList from './CampaignList'
import SwiperBanner from './SwiperBanner'

import styles from './campaign.module.scss'

const UserDonation = () => {
  return (
    <UserLayout
      className="relative pt-[90px] md:pt-[150px] "
      headerColor="black"
    >
      <div className={`top-bg ${styles['campaign-page']}`}></div>
      <div className="container">
        <SwiperBanner className="mb-5" />
        <CampaignList />
      </div>
    </UserLayout>
  )
}

export default UserDonation
