import Navlink from '@/components/atoms/Navlink'
import React from 'react'

import styles from './about.module.scss'

export const BannerSection = () => {
  return (
    <section
      className={`xs-banner-inner-section parallax-window ${styles['banner-about']} `}
    >
      <div className="xs-black-overlay" />
      <div className="container">
        <div className="color-white xs-inner-banner-content">
          <h2>About Us</h2>
          <p>Berikan uluran tangan untuk beramal untuk sesama kita</p>
          <ul className="xs-breadcumb">
            <li className="badge badge-pill badge-primary">
              <Navlink href="/" className="color-white" text=" Home /" />
              About
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export const PopupVideoSection = ({
  videoLink = 'https://www.youtube.com/watch?v=Tb1HsAGy-ls',
}: {
  videoLink?: string
}) => {
  return (
    <div className="xs-video-popup-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 content-center">
            <div className="xs-video-popup-wraper">
              <img src="/images/video_img.jpg" alt="" />
              <div className="xs-video-popup-content">
                <Navlink
                  href={videoLink}
                  className="xs-video-popup xs-round-btn"
                  isExternalLink={true}
                >
                  <i className="fa fa-play" />
                </Navlink>
              </div>
              {/* <!-- .xs-video-popup-content end --> */}
            </div>
            {/* <!-- .xs-video-popup-wraper end --> */}
          </div>
        </div>
        {/* <!-- .row end --> */}
      </div>
      {/* <!-- .container end --> */}
    </div>
  )
}

export const AboutVision = () => {
  return (
    <section className="xs-content-section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-11 content-center">
            <div className="xs-heading xs-mb-100 text-center">
              <h2 className="xs-mb-0 xs-title">
                Lembaga non-profit yang digagas oleh
                <span className="color-green">
                  {' '}
                  Yayasan Peduli Yatim Piatu An-Nur{' '}
                </span>
                dengan semangat Sejuta Kebaikan Dimulai Dari Satu Langkah
                Bersama
              </h2>
            </div>
          </div>
        </div>
        {/* <!-- .row end --> */}
        <div className="row">
          <div className="col-md-4">
            <div className="xs-about-feature">
              <h3>Misi Kami</h3>
              <p className="lead">
                Kami bertujuan untuk menjadi pilar pendidikan dan pembinaan
                agama yang berkualitas bagi anak yatim piatu, memperkaya
                kehidupan mereka dengan program-program keterampilan yang
                dirancang untuk meningkatkan kepercayaan diri dan kemandirian.
                Kami berkomitmen untuk membangun dan memelihara hubungan dengan
                komunitas dan pihak terkait untuk mendukung keberlanjutan
                inisiatif kami, sekaligus melaksanakan advokasi sosial yang kuat
                untuk meningkatkan pemahaman dan dukungan masyarakat terhadap
                anak yatim piatu
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="xs-about-feature">
              <h3>Visi Kami</h3>
              <p className="lead">
                Menjadi lembaga pendorong pertumbuhan anak yatim piatu,
                memberdayakan mereka melalui pendidikan dan pembinaan agama
                serta keterampilan, untuk menciptakan generasi yang berdaya,
                beretika, dan berakhlak mulia
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="xs-about-feature">
              <h3>Our Values</h3>
              <ul className="xs-unorder-list play green-icon">
                <li>Kasih Sayang</li>
                <li>Perjuangan</li>
                <li>Integritas</li>
                <li>Kerjasama</li>
              </ul>
            </div>
          </div>
        </div>
        {/* <!-- .row end --> */}
      </div>
      {/* <!-- .container end --> */}
    </section>
  )
}

export const CounterSection = () => {
  return (
    <div
      className={`xs-funfact-section xs-content-section-padding waypoint-tigger parallax-window ${styles['funfacts']}`}
    >
      <div className="container">
        <div className="row col-lg-10 xs-heading mx-auto">
          <h2 className="xs-title color-white small">
            Our agency has been present for over 30 years. We make the best for
            all our children.
          </h2>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="xs-single-funFact color-white">
              <i className="icon-donation_2" />
              <span
                className="number-percentage-count number-percentage"
                data-value="10"
                data-animation-duration="3500"
              >
                0
              </span>
              <span>M</span>
              <small>Causes</small>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="xs-single-funFact color-white">
              <i className="icon-group" />
              <span
                className="number-percentage-count number-percentage"
                data-value="25"
                data-animation-duration="3500"
              >
                0
              </span>
              <span>k</span>
              <small>Valunteer</small>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="xs-single-funFact color-white">
              <i className="icon-children" />
              <span
                className="number-percentage-count number-percentage"
                data-value="30"
                data-animation-duration="3500"
              >
                0
              </span>
              <span>k</span>
              <small>Childrens</small>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="xs-single-funFact color-white">
              <i className="icon-planet-earth" />
              <span
                className="number-percentage-count number-percentage"
                data-value="14"
                data-animation-duration="3500"
              >
                0
              </span>
              <span>k</span>
              <small>Countrys</small>
            </div>
          </div>
        </div>
        {/* <!-- .row end --> */}
      </div>
      {/* <!-- .container end --> */}
      <div className="xs-black-overlay" />
    </div>
  )
}

export const WeDoSection = () => {
  return (
    <section className="xs-section-padding">
      <div className="container">
        <div className="xs-heading row xs-mb-60">
          <div className="col-md-9 col-xl-9">
            <h2 className="xs-title">What We Do</h2>
            <span className="xs-separetor dashed" />
            <p>
              It allows you to gather monthly subscriptions from fans to help
              fund your creative projects. They also encourage their users to
              offer rewards to fans as a way to repay them for their support.
            </p>
          </div>
          {/* <!-- .xs-heading-title END --> */}
        </div>
        {/* <!-- .row end --> */}
        <div className="row text-center lg:text-left">
          <div className="col-md-6 col-lg-3">
            <div className="xs-service-promo">
              <span className="icon-water color-orange" />
              <h5>
                Pure Water
                <br />
                For Poor People
              </h5>
              <p>
                663 million people drink dirty water. Learn how access to clean
                water can improve health, boost local economies.
              </p>
            </div>
            {/* <!-- .xs-service-promo END --> */}
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="xs-service-promo">
              <span className="icon-groceries color-red" />
              <h5>
                Healty Food
                <br />
                For Poor People
              </h5>
              <p>
                663 million people drink dirty water. Learn how access to clean
                water can improve health, boost local economies.
              </p>
            </div>
            {/* <!-- .xs-service-promo END --> */}
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="xs-service-promo">
              <span className="icon-heartbeat color-purple" />
              <h5>
                Medical
                <br />
                Facilities for People
              </h5>
              <p>
                663 million people drink dirty water. Learn how access to clean
                water can improve health, boost local economies.
              </p>
            </div>
            {/* <!-- .xs-service-promo END --> */}
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="xs-service-promo">
              <span className="icon-open-book color-green" />
              <h5>
                Pure Education
                <br />
                For Every Children
              </h5>
              <p>
                663 million people drink dirty water. Learn how access to clean
                water can improve health, boost local economies.
              </p>
            </div>
            {/* <!-- .xs-service-promo END --> */}
          </div>
        </div>
        {/* <!-- .row end --> */}
      </div>
      {/* <!-- .container end --> */}
    </section>
  )
}
