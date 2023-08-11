'use client'
import { Button, Descriptions, Image, Modal, Space, Tag, Tooltip } from 'antd'
import dayjs from 'dayjs'
import { EditOutlined, InfoCircleOutlined } from '@ant-design/icons'
import Link from 'next/link'
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'

/* Component */
import CustomTable from '@/components/organisms/Table'

/* Utils */
import { currencyFormat } from '@/helpers'
import { getCharityClient } from '@/services/charity/clientService'
import { NAVIGATION_LINK } from '@/utils/link'
import { CAMPAIGN_STATUS_WITH_COLORS } from './campaign'
import useUpdated from '@/hooks/useUpdated'
import { IModalTable } from './campaign.interfce'
import _ from 'lodash'

function getColumns(showModal: any) {
  return [
    {
      dataIndex: 'title',
      key: 'title',
      title: 'Title Campaign',
    },
    {
      dataIndex: ['author', 'name'],
      key: 'author',
      title: 'Author Name',
    },
    {
      title: 'Status',
      key: 'status',
      width: 100,
      render: (value: any) => {
        const { status, end_date } = value

        const isCampaignStillRunning = dayjs(end_date) > dayjs()

        let campaignStatus = CAMPAIGN_STATUS_WITH_COLORS.find(
          (item) => item.status === status
        )

        if (campaignStatus) {
          if (!isCampaignStillRunning) {
            campaignStatus = CAMPAIGN_STATUS_WITH_COLORS.find(
              (item) => item.label === 'completed'
            )
          }
          return (
            <Tag color={campaignStatus?.color}>
              {campaignStatus?.status.toUpperCase()}
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

      render: (data: number) => `Rp. ${currencyFormat(data)}`,
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
      // width: 150,
      render: (value: any, record: any) => {
        return (
          <div className="flex items-center">
            <Tooltip placement="bottomRight" title="Detail Report Campaign">
              <Link
                href={`${NAVIGATION_LINK.ReportCampaign}/${value._id}`}
                className="px-3 py-2"
              >
                <InfoCircleOutlined />
              </Link>
            </Tooltip>
          </div>
        )
      },
    },
  ]
}

const ReportCampaign = () => {
  const searchParams = useSearchParams()
  const [visible, setVisible] = useState<boolean>(false)
  const [chairtyData, setCharityData] = useState<any>({})

  const init = async (
    current?: number | string,
    pageSize?: number | string
  ) => {
    const queryParams = {
      page: Number(current) || 1,
      rows: Number(pageSize) || 10,
    }
    const dataCharity = await getCharityClient(queryParams, 'accept')
    const result = {
      data: dataCharity.charity,
      meta: dataCharity.meta,
    }
    return result
  }

  const showModal = (record: any) => {
    setCharityData(record)
    setVisible(true)
  }

  return (
    <div>
      <CustomTable
        columns={getColumns(showModal)}
        init={init}
        hideAddButton
        hideSearchField
      />
    </div>
  )
}

export default ReportCampaign
