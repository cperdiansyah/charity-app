'use client'
import { Space, Tag, Tooltip } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { EditOutlined, InfoCircleOutlined } from '@ant-design/icons'
import Link from 'next/link'
import React from 'react'

/* Component */
import CustomTable from 'components/organisms/Table'

/* Utils */
import { currencyFormat } from 'helpers'
import { getCharityClient } from 'services/charity/clientService'
import { NAVIGATION_LINK } from 'utils/link'
import { CAMPAIGN_STATUS_WITH_COLORS } from './campaign'
import { useSearchParams } from 'next/navigation'

const columns: ColumnsType<any> = [
  {
    dataIndex: 'title',
    key: 'title',
    title: 'Title',
    width: 250,
  },
  {
    title: 'Status',
    key: 'status',
    width: 100,
    render: (value: any) => {
      const { status, end_date } = value
      const isCampaignStillRunning = dayjs(end_date) > dayjs()

      const campaignStatus = CAMPAIGN_STATUS_WITH_COLORS.find(
        (item) => item.label === status
      )

      if (campaignStatus) {
        if (!isCampaignStillRunning) {
          const campaignStatus = CAMPAIGN_STATUS_WITH_COLORS.find(
            (item) => item.label === 'completed'
          )
          return (
            <Tag color={campaignStatus?.color}>
              {campaignStatus?.status?.toUpperCase()}
            </Tag>
          )
        }
        return (
          <Tag color={campaignStatus.color}>
            {campaignStatus.status.toUpperCase()}
          </Tag>
        )
      }
      return <Tag color="default">{status.toUpperCase()}</Tag>
    },
  },
  {
    title: 'Donation Target',
    dataIndex: 'donation_target',
    key: 'donation_target',

    render: (data) => `Rp. ${currencyFormat(data)}`,
  },
  {
    title: 'Start Date',
    dataIndex: 'start_date',
    key: 'start_date',
    render: (date: string) => dayjs(date).format('DD MMMM YYYY'),
  },
  {
    title: 'End Date',
    dataIndex: 'end_date',
    key: 'end_date',
    render: (date: string) => dayjs(date).format('DD MMMM YYYY'),
  },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    width: 150,
    render: (value: any, record: any) => {
      return (
        <div className="flex items-center">
          <Tooltip placement="bottomRight" title="Edit Banner">
            <Link
              href={`${NAVIGATION_LINK.CampaignEdit}${value._id}`}
              className="px-3 py-2"
            >
              <EditOutlined />
            </Link>
          </Tooltip>
        </div>
      )
    },
  },
]

const AdminCharity = async () => {
  const searchParams = useSearchParams()
  const current = searchParams.get('current')
  const pageSize = searchParams.get('pageSize')
  const queryParams = {
    page: current || 1,
    rows: pageSize || 10,
  }

  const init = async () => {
    const dataCharity = await getCharityClient(queryParams)
    const result = {
      data: dataCharity.charity,
      meta: dataCharity.meta,
    }
    return result
  }

  return (
    <div>
      <CustomTable columns={columns} init={init} />
    </div>
  )
}

export default AdminCharity
