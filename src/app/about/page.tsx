import React from 'react'
import {
  AboutVision,
  BannerSection,
  CounterSection,
  PopupVideoSection,
  WeDoSection,
} from './about.elements'
import UserTemplate from '@/components/templates/UserLayout'

const About = () => {
  return (
    <UserTemplate>
      <BannerSection />
      <main className="xs-main">
        <PopupVideoSection />
        <AboutVision />
        {/* <CounterSection />
        <WeDoSection /> */}
      </main>
    </UserTemplate>
  )
}

export default About
