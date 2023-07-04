'use client'
import React from 'react'
import CharityCard from '@/components/molecules/CharityCard'
import UserLayout from '@/components/templates/UserLayout'

const UserDonation = () => {
  return (
    <UserLayout paddingTop={150}>
      {/* <div>UserDonation</div> */}
      <div className="container">
        <CharityCard
          author="Chandra"
          donated={200000}
          endDate={'2023/07/20'}
          image="http://dev.laptop.org/~reuben/Donate3.jpg"
          target={200000}
          title="Lalalala"
          slug='lalala'
        />
      </div>
    </UserLayout>
  )
}

export default UserDonation
