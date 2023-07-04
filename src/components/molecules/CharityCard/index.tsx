import React from 'react'
import {
  calculateDaysRemaining,
  calculateFunded,
  currencyFormat,
} from '@/helpers'
import CustomButton from '@/components/atoms/Button'

import styles from './charityCard.module.scss'

export interface ICharityCard {
  image: string
  target: number
  donated: number
  title: string
  endDate: string | Date
  author: string
}
const CharityCard = (props: ICharityCard) => {
  const { image, target, donated, title, endDate, author } = props
  const calculateFund = calculateFunded(donated, target)
  return (
    <div className="col-lg-4 col-md-6">
      <div className="xs-popular-item xs-box-shadow">
        <div className="xs-item-header">
          <img src={image} alt="" />

          <div className="xs-skill-bar">
            <div
              className="xs-skill-track"
              style={{
                width: `${calculateFund}%`,
              }}
            >
              <p>
                <span className="number-percentage-count number-percentage">
                  {calculateFund}
                </span>
                %
              </p>
            </div>
          </div>
        </div>
        {/* <!-- .xs-item-header END --> */}
        <div className="xs-item-content">
          {/* <ul className="xs-simple-tag xs-mb-20">
          <li>
            <a href="">{charity.category}</a>
          </li>
        </ul> */}

          <a href="#" className="xs-post-title xs-mb-30">
            {title}
          </a>

          <ul className="xs-list-with-content">
            <li className="pledged">
              {currencyFormat(donated)}
              <span>Pledged</span>
            </li>
            <li>
              <span
                className="number-percentage-count number-percentage"
                data-value="90"
                data-animation-duration="3500"
              >
                {calculateFund}
              </span>
              %<span>Funded</span>
            </li>
            <li>
              {calculateDaysRemaining(endDate)}
              <span>Days to go</span>
            </li>
          </ul>

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

          <CustomButton
            buttontype="primary"
            className="btn btn-primary btn-block"
            href="#popularcause"
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
