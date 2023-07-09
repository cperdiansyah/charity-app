import React from 'react'
import { useRouter } from 'next/router'

import UserLayout from '@/components/templates/UserLayout'
const CampaignDetail = () => {
  
  return (
    <UserLayout paddingTop={150} className="relative" headerColor="black">
      {/* <div className={`top-bg ${styles['campaign-page']}`}></div>
      <div className="container">
        <SwiperBanner className="mb-5" />
        <CampaignList />
      </div> */}
    </UserLayout>
  )
}

export default CampaignDetail