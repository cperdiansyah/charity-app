'use client'
import React, { useEffect, useState } from 'react'
import { Descriptions, Spin, Tag, notification } from 'antd'
import {
  LoadingOutlined,
  DownloadOutlined,
  CloudDownloadOutlined,
} from '@ant-design/icons'

import { useParams } from 'next/navigation'
import _get from 'lodash/get'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import localeData from 'dayjs/plugin/localeData'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/id'

/* Component */
import CustomTable from '@/components/organisms/Table'

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
import Navlink from '@/components/atoms/Navlink'

// Apply the plugins
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localeData)
dayjs.extend(customParseFormat)

dayjs.locale('id')

function getColumns(showModal?: any) {
  return [
    {
      dataIndex: ['user_id', 'name'],
      key: 'author',
      title: 'User Name',
    },
    {
      title: 'Donation Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) =>
        dayjs.utc(date).tz('Asia/Jakarta').format('dddd, D MMMM YYYY'),
    },
    {
      title: 'Donation Amount',
      dataIndex: 'amount',
      key: 'donation_target',
      render: (data: number) => `${currencyFormat(data)}`,
    },
  ]
}

const ReportCampaignDetail = () => {
  const params = useParams()
  const { id: idCharity } = params

  const [visible, setVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [dataCampaign, setCampaign] = useState<ICampaignData | undefined>()
  const [paymentData, setPaymentData] = useState({
    campaignPayment: [],
    meta: { total: 0 },
  })
  const [amount, setAmount] = useState<number>(0)
  const [loadingGeneratePdf, setLoadingGeneratePdf] = useState(false)

  useEffect(() => {
    setLoading((state) => true)

    getCampaignData()
    setTimeout(() => {
      setLoading((state) => false)
    }, 300)
  }, [])

  const init = async (
    current?: number | string,
    pageSize?: number | string
  ) => {
    try {
      const queryParams = {
        page: Number(current) || 1,
        rows: Number(pageSize) || 10,
      }
      const resPaymentCharity = await api.get(
        `${SERVICE.Transaction}/charity/${idCharity}`,
        {
          params: {
            ...queryParams,
            getAll: true,
            status: 'settlement',
          },
        }
      )
      const dataPaymentCharity = resPaymentCharity.data
      setPaymentData(dataPaymentCharity)

      const totalAmount = calculateTotalAmount(
        dataPaymentCharity?.campaignPayment
      )
      setAmount(totalAmount)

      const result = {
        data: dataPaymentCharity.campaignPayment,
        meta: dataPaymentCharity.meta,
      }
      return result
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

  const handleDownload = async () => {
    setLoadingGeneratePdf((state) => true)
    try {
      const resReportData = await api.get(
        `${SERVICE.report}/campaign/${idCharity}`
      )
      const dataReport = resReportData.data

      setTimeout(() => {
        setLoadingGeneratePdf((state) => false)
      }, 500)

      notification.destroy()
      notification.success({
        message: 'Generate Report Successful',
        placement: 'topRight',
        duration: 0,
        description: (
          <div>
            <Navlink
              href={`${dataReport.url}`}
              className={`btn btn-primary btn-block mx-auto mt-3 flex w-fit gap-3 rounded-lg !px-4 !py-3 text-sm `}
              isExternalLink
            >
              {/* {props.children} */}
              <CloudDownloadOutlined /> File Is Ready
            </Navlink>
          </div>
        ),
      })
    } catch (error: any) {
      console.error(error)
      setLoadingGeneratePdf((state) => false)

      const errorResponse = error.response
      notify(
        'error',
        'Something went wrong',
        errorResponse.data.error.error.message || '',
        'bottomRight'
      )
    }
  }

  return (
    <div>
      <button
        onClick={handleDownload}
        className="btn !ml-auto  !flex gap-3 !rounded-md border border-gray-300 !px-4 !py-3 !text-gray-500 shadow-md hover:shadow-lg"
      >
        <DownloadOutlined /> Download Report
      </button>
      {/* Campaign Info */}
      <Spin spinning={loadingGeneratePdf} tip="Generate Report...">
        <Descriptions bordered title="Campaign Data" className="gap-3">
          <Descriptions.Item label="Campaign Author" span={24}>
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
        <h2 className="mt-5 pl-3 text-base font-semibold">
          User List Donation
        </h2>
        <CustomTable
          columns={getColumns()}
          init={init}
          hideAddButton
          hideSearchField
          loading={loading}
        />
      </Spin>
    </div>
  )
}

export default ReportCampaignDetail
