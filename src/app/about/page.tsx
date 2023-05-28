import React from 'react'
import {
  AboutVision,
  BannerSection,
  CounterSection,
  PopupVideoSection,
  WeDoSection,
} from './about.elements'

const About = () => {
  return (
    <>
      <BannerSection />
      <main className="xs-main">
        <PopupVideoSection />
        <AboutVision />
        <CounterSection />
        <WeDoSection />
      </main>
    </>
  )
}

export default About
