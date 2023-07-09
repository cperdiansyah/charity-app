import React from 'react'
import {
  calculateDaysRemaining,
  calculateFunded,
  currencyFormat,
} from '@/helpers'
import CustomButton from '@/components/atoms/Button'

import styles from './charityCard.module.scss'
import Link from 'next/link'
import { NAVIGATION_LINK } from '@/utils/link'
import useScreenWidth from '@/hooks/useScreenWidth'

export interface ICharityCard {
  image: string
  target: number
  donated: number
  title: string
  endDate: string | Date
  author: string
  slug: string
}
const CharityCard = (props: ICharityCard) => {
  const { image, target, donated, title, endDate, author, slug } = props
  // console.log(props)

  const calculateFund = calculateFunded(donated, target)

  const progressBar = calculateFund === 0 ? 8 : calculateFund

  return (
    <div className="col-lg-4 col-md-6 col-6 px-2">
      <div
        className={`xs-popular-item xs-box-shadow ${styles['charity-card']}`}
      >
        <div className={`xs-item-header ${styles['card-header']}`}>
          <img
            src={image}
            alt={title}
            className={` ${styles['charity-card-image']}`}
          />

          <div className="xs-skill-bar">
            <div
              className={`xs-skill-track ${styles['charity-skill-bar']}`}
              style={{
                width: `${calculateFund}%`,
              }}
            >
              <p className={`${styles['percentage-funded']}`}>
                <span className="number-percentage-count number-percentage ">
                  {calculateFund}
                </span>
                %
              </p>
            </div>
          </div>
        </div>
        {/* <!-- .xs-item-header END --> */}
        <div
          className={`xs-item-content p-[12px] md:p-5 ${styles['card-content']} `}
        >
          {/* <ul className="xs-simple-tag xs-mb-20">
          <li>
            <a href="">{charity.category}</a>
          </li>
        </ul> */}

          <Link
            href={`${NAVIGATION_LINK.Campaign}/${slug}`}
            className="xs-post-title mb-3 text-xl text-black md:mb-7 md:text-2xl"
          >
            {title}
          </Link>
          {/* </Link> */}

          <ul className="xs-list-with-content mb-3 ">
            <li className="pledged">
              {currencyFormat(donated)}
              <span className={`${styles['font-label']}`}>Pledged</span>
            </li>
            <li>
              <span
                className="number-percentage-count number-percentage"
                data-value="90"
                data-animation-duration="3500"
              >
                {calculateFund}
              </span>
              %<span className={`${styles['font-label']}`}>Funded</span>
            </li>
            <li>
              {calculateDaysRemaining(endDate)}
              <span className={`${styles['font-label']}`}>Days to go</span>
            </li>
          </ul>
          <div className="charity-user  hidden md:block">
            <span className="xs-separetor" />

            <div className="row xs-margin-0">
              {/* <div className="xs-round-avatar">
            <img src={profile_photo} alt="" />
          </div> */}
              <div className="xs-avatar-title">
                <a href="#">
                  <span>By</span>
                  {author}
                </a>
              </div>
            </div>

            <span className="xs-separetor" />
          </div>
          <CustomButton
            buttontype="primary"
            className={`btn btn-primary btn-block ${styles['card-button']} `}
            // href="#popularcause"
            href={`${NAVIGATION_LINK.Campaign}/${slug}`}
          >
            Donate This Cause
          </CustomButton>
        </div>
        {/* <!-- .xs-item-content END --> */}
      </div>
    </div>
  )
}

export default CharityCard
