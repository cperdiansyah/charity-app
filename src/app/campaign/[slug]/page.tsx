'use client'

import React, { useEffect, useState } from 'react'
import { Button, Modal, Progress, Spin } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeftOutlined } from '@ant-design/icons'
import _isEmpty from 'lodash/isEmpty'

import UserLayout from '@/components/templates/UserLayout'
import CustomButton from '@/components/atoms/Button'

import {
  calculateDaysRemaining,
  calculateFunded,
  calculateTotalAmount,
  currencyFormat,
} from '@/helpers'

import styles from './campaignDetail.module.scss'
import { api } from '@/utils/clientSideFetch'
import { SERVICE } from '@/utils/api'
import dayjs from 'dayjs'
import useUpdated from '@/hooks/useUpdated'

const CampaignDetail = () => {
  const router = useRouter()
  const params = useParams()
  const { slug: slugcharity } = params

  const [isExpand, setIsExpand] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [campaignData, setCampaignData] = useState<any>()
  const [paymentData, setPaymentData] = useState<any>()
  const [amount, setAmount] = useState<number>(0)

  const percentage = calculateFunded(amount, campaignData?.donation_target || 0)
  // const percentage = 102
  console.log(percentage)
  const today = dayjs()
  const endDate = dayjs(campaignData?.end_date || today)
  useEffect(() => {
    // console.log(params)
    const getData = async () => {
      setLoading(true)
      await getCampaignData()
      setLoading(false)
    }
    getData()
  }, [])

  useUpdated(() => {
    if (!_isEmpty(campaignData)) {
      setLoading(true)
      getPaymentData()
      setLoading(false)
    }
  }, [campaignData?._id])

  const getCampaignData = async () => {
    // setLoading(true)
    try {
      const resDetailCharity = await api.get(
        `${SERVICE.charityBySlug}/${slugcharity}`
      )
      const dataCharity = resDetailCharity.data.charity
      setCampaignData(dataCharity)
      // setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const getPaymentData = async () => {
    try {
      const resPaymentCharity = await api.get(
        `${SERVICE.PaymentCharity}charity/${campaignData?._id}?getAll=true&status=paid`
      )
      const dataPaymentCharity = resPaymentCharity.data.campaignPayment
      setPaymentData(dataPaymentCharity)

      const totalAmount = calculateTotalAmount(dataPaymentCharity)
      setAmount(totalAmount)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleClick = () => {
    router.back()
  }

  const handleSubmit = () => {
    console.log('asdasd')
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <UserLayout
      className="relative pt-[90px] md:pt-[150px] "
      headerColor="black"
    >
      <Spin spinning={loading}>
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
                src={
                  campaignData?.media[0]?.cotent ||
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'
                }
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
                <span className="h3 my-3 block capitalize">
                  {campaignData?.title}
                </span>
              </div>
              <div
                className={`mb-3 ${styles['campaign-content-info__campaign-count']}`}
              >
                <Progress
                  percent={percentage}
                  status="active"
                  showInfo={false}
                />
                <ul className="xs-list-with-content mb-3 ">
                  <li className="pledged ">
                    {currencyFormat(amount)}
                    <span className={`${styles['font-label']}`}>Pledged</span>
                  </li>
                  <li className="target ">
                    {currencyFormat(campaignData?.donation_target || 0)}
                    <span className={`${styles['font-label']}`}>Target</span>
                  </li>
                  <li className="">
                    <span
                      className="number-percentage-count number-percentage"
                      data-value="90"
                      data-animation-duration="3500"
                    >
                      {percentage}
                    </span>
                    %<span className={`${styles['font-label']}`}>Funded</span>
                  </li>
                  <li className="">
                    {endDate && endDate.diff(today, 'day')}
                    <span className={`${styles['font-label']}`}>
                      Days to go
                    </span>
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
                    __html: campaignData?.description,
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
                onClick={handleSubmit}
                // href="#popularcause"
                // href={`${NAVIGATION_LINK.Campaign}/${slug}`}
                disabled={percentage >= 100}
              >
                {percentage >= 100
                  ? 'All donations have been collected'
                  : ' Donate This Cause'}
              </CustomButton>
            </div>
          </div>
        </div>
      </Spin>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="z-auto"
        centered
        footer={null}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </UserLayout>
  )
}

export default CampaignDetail
