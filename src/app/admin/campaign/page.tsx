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
import { currencyFormat } from 'helpers'
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

        let campaignStatus = CAMPAIGN_STATUS_WITH_COLORS.find(
          (item) => item.label === status
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

const MemoizeModalTable = React.memo(ModalTable)

const AdminCharity = () => {
  const searchParams = useSearchParams()
  const [visible, setVisible] = useState<boolean>(false)
  const [chairtyData, setCharityData] = useState<any>({})

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

  const showModal = (record: any) => {
    setCharityData(record)
    setVisible(true)
  }

  return (
    <div>
      <CustomTable columns={getColumns(showModal)} init={init} />
      <MemoizeModalTable
        open={visible}
        setOpen={setVisible}
        data={chairtyData}
        setData={setCharityData}
      />
    </div>
  )
}

function ModalTable(props: IModalTable) {
  if (props?.data === undefined) return <></>

  const handleCancel = (e: any) => {
    e.stopPropagation()
    if (props?.setOpen) props?.setOpen(false)
  }

  const resetData = (e?: any) => {
    setTimeout(() => {
      if (props?.setData) props?.setData()
    }, 500)
  }

  useUpdated(() => {
    if (!props.open) {
      resetData()
    }
  }, [props.open])

  /* Status */
  const { status, end_date } = props?.data
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

  return (
    <Modal
      onCancel={handleCancel}
      open={props.open}
      footer={null}
      closable={true}
      maskClosable={true}
    >
      {/* <Button>Detail</Button> */}
      <Descriptions bordered className="mt-4">
        <Descriptions.Item label="Title" span={24}>
          {props?.data?.title}
        </Descriptions.Item>
        <Descriptions.Item label="Image" span={24}>
          <Image
            src={_.get(props?.data, 'media[0].content')}
            alt={props?.data?.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Descriptions.Item>
        <Descriptions.Item label="Donation Target" span={24}>
          {`Rp. ${currencyFormat(props?.data?.donation_target)}`}
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={24}>
          {campaignStatus ? (
            <Tag color={campaignStatus?.color}>
              {campaignStatus?.status?.toUpperCase()}
            </Tag>
          ) : (
            <Tag color="default">{status?.toUpperCase()}</Tag>
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Start Date" span={24}>
          {dayjs(props?.data?.start_date).format('DD MMMM YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="End Date" span={24}>
          {dayjs(props?.data?.end_date).format('DD MMMM YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="Post Date" span={24}>
          {props?.data?.post_date
            ? dayjs(props?.data?.post_date).format('DD MMMM YYYY')
            : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="Description" span={24}>
          <div
            dangerouslySetInnerHTML={{ __html: props?.data?.description }}
          ></div>
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}

export default AdminCharity
