import React from 'react'
import _ from 'lodash'
import UserLayout from '@/components/templates/UserLayout'

import CampaignList from './CampaignList'

const UserDonation = () => {
  return (
    <UserLayout paddingTop={150}>
      <div className="container">
        <CampaignList />
      </div>
    </UserLayout>
  )
}

export default UserDonation
