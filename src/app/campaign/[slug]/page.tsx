'use client'

import React from 'react'
import { Button, Progress } from 'antd'
import { useRouter } from 'next/navigation'
import { ArrowLeftOutlined } from '@ant-design/icons'

import UserLayout from '@/components/templates/UserLayout'

import styles from './campaignDetail.module.scss'
import CustomButton from '@/components/atoms/Button'
import { calculateDaysRemaining, currencyFormat } from '@/helpers'
const CampaignDetail = () => {
  const router = useRouter()

  const handleClick = () => {
    router.back()
  }

  return (
    <UserLayout
      className="relative pt-[90px] md:pt-[150px] "
      headerColor="black"
    >
      <div className={`${styles['campaign']} container mb-10`}>
        <div className="campaign-header">
          <div className="button-back ">
            <Button
              onClick={handleClick}
              className=" mr-2 flex items-center justify-center border-0 "
            >
              <ArrowLeftOutlined />
              <span className="text-base">Back</span>
            </Button>
          </div>
        </div>
        <div className="campaign-content">
          <div className={`${styles['campaign-content-image']}`}>
            <img
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/charity-template-banner-design-326a2d18518aadf7713faf82710e7d03_screen.jpg?ts=1662626212"
              alt=""
              className=""
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className={`${styles['campaign-content-info']}`}>
            <div className={`${styles['campaign-content-info__title']}`}>
              <span className="h3 my-3 block capitalize">title asda ss</span>
            </div>
            <div
              className={`${styles['campaign-content-info__campaign-count']}`}
            >
              <Progress percent={50} status="active" showInfo={false} />
              <ul className="xs-list-with-content mb-3 ">
                <li className="pledged ">
                  {currencyFormat(120000)}
                  <span className={`${styles['font-label']}`}>Pledged</span>
                </li>
                <li className="target ">
                  {currencyFormat(120000)}
                  <span className={`${styles['font-label']}`}>Target</span>
                </li>
                <li className="">
                  <span
                    className="number-percentage-count number-percentage"
                    data-value="90"
                    data-animation-duration="3500"
                  >
                    {/* {calculateFund} */}
                    {0}
                  </span>
                  %<span className={`${styles['font-label']}`}>Funded</span>
                </li>
                <li className="">
                  {/* {calculateDaysRemaining(endDate)} */}0
                  <span className={`${styles['font-label']}`}>Days to go</span>
                </li>
              </ul>
            </div>
          </div>
          <div className={`${styles['campaign-content-button']}`}>
            <CustomButton
              buttontype="primary"
              className={`btn btn-primary btn-block ${styles['campaign-button']} `}
              // href="#popularcause"
              // href={`${NAVIGATION_LINK.Campaign}/${slug}`}
            >
              Donate This Cause
            </CustomButton>
          </div>
        </div>
      </div>
    </UserLayout>
  )
}

export default CampaignDetail
