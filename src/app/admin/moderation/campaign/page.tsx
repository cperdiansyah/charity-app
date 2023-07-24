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
import useUpdated from '@/hooks/useUpdated'

function getColumns(showModal: any) {
  return [
    {
      dataIndex: 'title',
      key: 'title',
      title: 'Title',
      width: 250,
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
      width: 150,
      render: (value: any, record: any) => {
        return (
          <div className="flex items-center">
            <Tooltip placement="bottomRight" title="Edit Banner">
              <Link
                href={`${NAVIGATION_LINK.AdminCampaignEdit}${value._id}`}
                className="px-3 py-2"
              >
                <EditOutlined />
              </Link>
            </Tooltip>
            <Tooltip placement="bottomRight" title="Detail Banner">
              <Button
                style={{ color: '#1890ff', border: 'solid 0px' }}
                onClick={() => showModal(record)}
              >
                <InfoCircleOutlined />
              </Button>
            </Tooltip>
          </div>
        )
      },
    },
  ]
}

const ModerationCampaign = () => {
  return <div>ModerationCampaign</div>
}

export default ModerationCampaign
