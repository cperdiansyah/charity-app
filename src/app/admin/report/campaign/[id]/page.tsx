'use client'
import React, { useEffect, useState } from 'react'
import { Descriptions, Row, Tag } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import { useParams } from 'next/navigation'
import _get from 'lodash/get'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import localeData from 'dayjs/plugin/localeData'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/id'

import { notify } from '@/helpers/notify'
import { SERVICE } from '@/utils/api'
import { api } from '@/utils/clientSideFetch'
import { ICampaignData } from '../campaign.interfce'
import {
  calculateFunded,
  calculateTotalAmount,
  currencyFormat,
} from '@/helpers'
import { CAMPAIGN_STATUS_WITH_COLORS } from '../campaign'

// Apply the plugins
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localeData)
dayjs.extend(customParseFormat)

dayjs.locale('id')

const ReportCampaignDetail = () => {
  const params = useParams()
  const { id: idCharity } = params

  const [visible, setVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [dataCampaign, setCampaign] = useState<ICampaignData | undefined>()
  const [paymentData, setPaymentData] = useState<any>()
  const [amount, setAmount] = useState<number>(0)

  useEffect(() => {
    setLoading((state) => true)

    getCampaignData()
    getTransactionData()
    setLoading((state) => false)
  }, [])

  const getCampaignData = async () => {
    try {
      const resCharity = await api.get(
        [SERVICE.charity, `/${idCharity}`].join('')
      )
      const dataCharity = _get(resCharity, 'data')
      setCampaign(dataCharity?.charity)
    } catch (error: any) {
      console.error(error)
      const errorResponse = error.response
      notify(
        'error',
        'Something went wrong',
        errorResponse.data.error.error.message || '',
        'bottomRight'
      )
    }
  }

  const getTransactionData = async () => {
    try {
      const resPaymentCharity = await api.get(
        `${SERVICE.Transaction}/charity/${idCharity}?getAll=true&status=settlement`
      )
      const dataPaymentCharity = resPaymentCharity.data
      setPaymentData(dataPaymentCharity)

      const totalAmount = calculateTotalAmount(
        dataPaymentCharity?.campaignPayment
      )
      setAmount(totalAmount)
    } catch (error: any) {
      console.error(error)
      const errorResponse = error.response
      notify(
        'error',
        'Something went wrong',
        errorResponse.data.error.error.message || '',
        'bottomRight'
      )
    }
  }
  // console.log(paymentData)
  if (loading || !dataCampaign) return <LoadingOutlined />

  const status = dataCampaign?.status
  const end_date = dataCampaign?.end_date

  const isCampaignStillRunning = dayjs(end_date) > dayjs()

  let campaignStatus = CAMPAIGN_STATUS_WITH_COLORS.find(
    (item) => item.label === status
  )

  if (campaignStatus) {
    if (!isCampaignStillRunning) {
      campaignStatus = CAMPAIGN_STATUS_WITH_COLORS.find(
        (item) => item.label === 'completed'
      )
    }
  }

  const percentage = calculateFunded(
    amount || 0,
    dataCampaign?.donation_target || 0
  )

  return (
    <div>
      {/* Campaign Info */}
      <Descriptions bordered title="Campaign Data" className="gap-3">
        <Descriptions.Item label="Author" span={24}>
          {dataCampaign?.author?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Campaign Name" span={24}>
          {dataCampaign?.title}
        </Descriptions.Item>
        <Descriptions.Item label="Campaign Status" span={24}>
          {/* {dataCampaign?.title} */}
          <Tag color={campaignStatus?.color || 'default'}>
            {campaignStatus?.status.toUpperCase()}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Campaign Date" span={24}>
          {/* {dataCampaign?.title} */}
          {`${dayjs
            .utc(dataCampaign?.start_date)
            .tz('Asia/Jakarta')
            .format('dddd, D MMMM YYYY')} s/d ${dayjs
            .utc(dataCampaign?.end_date)
            .tz('Asia/Jakarta')
            .format('dddd, D MMMM YYYY')}`}
        </Descriptions.Item>
        <Descriptions.Item label="Donation Target" span={12}>
          {currencyFormat(dataCampaign?.donation_target || 0)}
        </Descriptions.Item>
        <Descriptions.Item label="Donaton Funded" span={12}>
          {currencyFormat(amount || 0)}{' '}
          <span className="font-medium">{`(${percentage}% of Donation Target)`}</span>
        </Descriptions.Item>
        <Descriptions.Item label="Total User Donation" span={24}>
          {paymentData?.meta?.total}
        </Descriptions.Item>
      </Descriptions>

      {/* User table user payment */}
    </div>
  )
}

export default ReportCampaignDetail
