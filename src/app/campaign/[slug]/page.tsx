'use client'

import React, { useEffect, useState } from 'react'
import {
  Alert,
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Progress,
  Spin,
} from 'antd'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeftOutlined } from '@ant-design/icons'
import _isEmpty from 'lodash/isEmpty'
import _get from 'lodash/get'

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
import useUserData from '@/stores/userData'
import { notify } from '@/helpers/notify'
import { IErrorResponse } from '@/services/auth/index.interface'
import useMidtransSnap from '@/hooks/useMidtransSnap'
import { NAVIGATION_LINK } from '@/utils/link'

const CampaignDetail = () => {
  const [form] = Form.useForm()
  const router = useRouter()
  const params = useParams()
  const { slug: slugcharity } = params

  const [userData, setUserData] = useUserData()
  const { token, setToken } = useMidtransSnap()

  const [isExpand, setIsExpand] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loadingSubmit, setLoadingSubmit] = useState(false)

  const [campaignData, setCampaignData] = useState<any>()
  const [paymentData, setPaymentData] = useState<any>()
  const [amount, setAmount] = useState<number>(0)

  const percentage = calculateFunded(amount, campaignData?.donation_target || 0)

  const today = dayjs()
  const endDate = dayjs(campaignData?.end_date || today)
  useEffect(() => {
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
        `${SERVICE.Transaction}/charity/${campaignData?._id}?getAll=true&status=settlement`
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

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleOpen = () => {
    if (!userData.id) {
      return router.replace(NAVIGATION_LINK.Login)
    }
    setIsModalOpen(true)
  }
  const handleCancel = () => {
    // setIsModalOpen(false)
    handleReset()
  }
  const handleReset = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const handleSubmitDonation = async (values: any) => {
    setLoadingSubmit(true)
    try {
      const donation = values.donation
      const campaignId = campaignData._id
      const userId = userData.id

      const transactionData = {
        user_id: userId,
        campaign_id: campaignId,
        amount: donation,
        transaction_type: 'campaign',
      }

      const resCreateTransaction = await api.post(
        `${SERVICE.Transaction}/charge`,
        transactionData
      )
      const dataCreateTransaction = resCreateTransaction.data.content
      const { redirect_url, token } = dataCreateTransaction?.response_midtrans
      console.log(redirect_url)
      setToken(token)
      handleReset()
      setLoadingSubmit(false)
    } catch (error: any) {
      const resError: IErrorResponse = _get(error, 'response.data.error', {
        code: 400,
        message: '',
      })
      setLoadingSubmit(false)
      console.log(error)

      notify(
        'error',
        'Something went wrong',
        resError?.message || '',
        'bottomRight'
      )
    }
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
              {/* <img
                src={
                  _get(campaignData, 'media[0].content') ||
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'
                }
                alt=""
                className=""
                loading="lazy"
                decoding="async"
              /> */}
              <Image
                // width={200}
                className={`${styles['campaign-content-image__antd-img']} `}
                height={'80vh'}
                style={{
                  objectFit: 'cover',
                }}
                width={'100%'}
                src={_get(campaignData, 'media[0].content')}
                fallback="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
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
                    <span className={`${styles['font-label']}`}>Donasi</span>
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
                      {percentage
                        ? percentage >= 100
                          ? '>100'
                          : percentage
                        : 0}
                    </span>
                    %
                    <span className={`${styles['font-label']}`}>Terkumpul</span>
                  </li>
                  <li className="">
                    {endDate && endDate.diff(today, 'day')}
                    <span className={`${styles['font-label']}`}>Hari Lagi</span>
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
                  {isExpand ? 'Selengkapnya' : 'Lebih Sedikit'}
                </button>
              </div>
            </div>
            <div className={`${styles['campaign-content-button']}`}>
              <CustomButton
                buttontype="primary"
                className={`btn btn-primary btn-block ${styles['campaign-button']} `}
                onClick={handleOpen}
                disabled={percentage >= 100}
              >
                {percentage >= 100
                  ? 'All donations have been collected'
                  : ' Donasi Sekarang'}
              </CustomButton>
            </div>
          </div>
        </div>
      </Spin>
      <Modal
        title="Input Donation"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="z-auto"
        centered
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          name="donation-form"
          initialValues={{ remember: true }}
          onFinish={handleSubmitDonation}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Donation"
            name="donation"
            shouldUpdate={(prevValues, curValues) =>
              prevValues.mediaSources !== curValues.mediaSources
            }
            rules={[
              {
                required: true,
                message: 'Silakan masukan donasi Anda',
              },
              {
                message: 'Donasi yang diberikan melebihi batas',
                validator(_, value) {
                  const donationTarget = campaignData?.donation_target
                  if (value > donationTarget) {
                    return Promise.reject()
                  } else {
                    return Promise.resolve()
                  }
                },
                // warningOnly: true,
              },
              {
                message: 'Donasi Anda melebihi target',
                validator(_, value) {
                  const donationTarget = campaignData?.donation_target
                  const donation = value + amount
                  if (donationTarget - donation >= 0) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject()
                  }
                },
              },
            ]}
            style={{
              width: '100%',
            }}
            className="mb-3"
          >
            <InputNumber
              prefix="Rp."
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Form.Item>
            {campaignData?.donation_target > amount && (
              <Alert
                message={`Anda masih dapat memberikan donasi sebesar Rp. ${currencyFormat(
                  campaignData?.donation_target - amount
                )}`}
                type="info"
              />
            )}
            {campaignData?.donation_target < amount && (
              <Alert
                message={`The donation has exceeded the target`}
                type="error"
              />
            )}
          </Form.Item>

          <Form.Item>
            <CustomButton
              buttontype="primary"
              className={`btn btn-primary btn-block ${styles['campaign-button']} `}
              htmlType="submit"
              loading={loadingSubmit}
            >
              Submit Donation
            </CustomButton>
          </Form.Item>
        </Form>
      </Modal>
    </UserLayout>
  )
}

export default CampaignDetail
