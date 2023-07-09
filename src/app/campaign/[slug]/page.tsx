'use client'

import React, { useState } from 'react'
import { Button, Progress } from 'antd'
import { useRouter } from 'next/navigation'
import { ArrowLeftOutlined } from '@ant-design/icons'

import UserLayout from '@/components/templates/UserLayout'
import CustomButton from '@/components/atoms/Button'

import { calculateDaysRemaining, currencyFormat } from '@/helpers'

import styles from './campaignDetail.module.scss'

const CampaignDetail = () => {
  const router = useRouter()

  const [isExpand, setIsExpand] = useState(false)

  const handleClick = () => {
    router.back()
  }

  const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque viverra justo nec ultrices dui. Nibh mauris cursus mattis molestie. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl. Non curabitur gravida arcu ac tortor dignissim convallis aenean et. Maecenas accumsan lacus vel facilisis. Ut pharetra sit amet aliquam id diam maecenas ultricies. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Donec pretium vulputate sapien nec sagittis aliquam malesuada. Luctus accumsan tortor posuere ac ut consequat. Magnis dis parturient montes nascetur ridiculus mus. Turpis in eu mi bibendum. Nisi est sit amet facilisis magna etiam. Consequat semper viverra nam libero justo laoreet sit amet. Cras sed felis eget velit aliquet. Luctus accumsan tortor posuere ac ut consequat semper viverra. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque. At erat pellentesque adipiscing commodo elit at. Sed felis eget velit aliquet sagittis id consectetur purus ut. Tempor nec feugiat nisl pretium fusce.

Cursus mattis molestie a iaculis. Enim sit amet venenatis urna cursus eget nunc scelerisque viverra. Laoreet sit amet cursus sit amet dictum. Pharetra vel turpis nunc eget lorem. Sed tempus urna et pharetra pharetra massa massa ultricies. Natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Nulla aliquet enim tortor at auctor urna. At imperdiet dui accumsan sit amet. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet dui. Volutpat sed cras ornare arcu dui vivamus arcu felis. Ut placerat orci nulla pellentesque dignissim enim sit amet venenatis. At volutpat diam ut venenatis tellus in metus. Nec nam aliquam sem et tortor consequat. Mauris a diam maecenas sed.

At auctor urna nunc id. Sagittis nisl rhoncus mattis rhoncus urna neque. A diam maecenas sed enim ut sem viverra aliquet. Quisque egestas diam in arcu cursus. Morbi enim nunc faucibus a. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Interdum varius sit amet mattis vulputate enim nulla aliquet porttitor. Ullamcorper malesuada proin libero nunc consequat interdum varius sit amet. Nisi quis eleifend quam adipiscing. Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Vitae tempus quam pellentesque nec nam aliquam sem. Eget arcu dictum varius duis at consectetur.

Id porta nibh venenatis cras sed felis eget velit. Aliquam purus sit amet luctus venenatis lectus magna fringilla urna. Tellus molestie nunc non blandit. Dui accumsan sit amet nulla facilisi morbi tempus. Nunc faucibus a pellentesque sit amet porttitor eget dolor morbi. Pharetra massa massa ultricies mi quis. Est placerat in egestas erat imperdiet. Pellentesque habitant morbi tristique senectus et netus et malesuada. Fames ac turpis egestas sed tempus urna. Enim blandit volutpat maecenas volutpat blandit. Tortor vitae purus faucibus ornare. Tincidunt augue interdum velit euismod in pellentesque massa placerat.

  .`

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
            <div
              className={`${styles['campaign-content-info__campaign-title']}`}
            >
              <span className="h3 my-3 block capitalize">title asda ss</span>
            </div>
            <div
              className={`mb-3 ${styles['campaign-content-info__campaign-count']}`}
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
            <div
              className={`${styles['campaign-content-info__campaign-description']}`}
            >
              <span className="mb-3 block text-xl font-semibold text-gray-700">
                Campaign Stories
              </span>
              <div
                className={`${
                  styles[
                    `campaign-content-info__campaign-description-content${
                      isExpand ? '-expand' : ''
                    }`
                  ]
                }`}
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              ></div>
              <button
                onClick={() => setIsExpand((prev) => !prev)}
                className={`${styles['campaign-content-info__campaign-description__expand-button']}`}
              >
                {isExpand ? 'Read More' : 'Read Less'}
              </button>
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
