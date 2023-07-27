'use client'
import { Button, Descriptions, Image, Modal, Spin, Tag, Tooltip } from 'antd'
import dayjs from 'dayjs'
import _get from 'lodash/get'
import {
  InfoCircleOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'

/* Component */
import CustomTable from '@/components/organisms/Table'

/* Utils */
import { currencyFormat } from '@/helpers'
import useUpdated from '@/hooks/useUpdated'
import { getApprovalBanner } from '@/services/moderation/clientService'
import { IModalTable } from '../../campaign/campaign.interfce'
import { CAMPAIGN_STATUS_WITH_COLORS } from '../../campaign/campaign'
import { notify } from '@/helpers/notify'
import { updateBannerStatus } from '@/services/banner/clientService'
import Link from 'next/link'

type Status = 'accept' | 'rejected'

function getColumns(
  showModal: any,
  approvalBanner: (data?: string, status?: Status) => VoidFunction,
  rejectedCampaign?: VoidFunction
) {
  return [
    {
      dataIndex: ['foreign_data', 'title'],
      key: 'title',
      title: 'Title',
      width: 250,
    },
    {
      title: 'Status',
      dataIndex: ['foreign_data', 'status'],
      key: 'status',
      width: 100,
      render: (status: any) => {
        let campaignStatus = CAMPAIGN_STATUS_WITH_COLORS.find(
          (item) => item.status === status
        )

        if (campaignStatus) {
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
      title: 'Start Date',
      dataIndex: ['foreign_data', 'start_date'],
      key: 'start_date',
      render: (date: string) => dayjs(date).format('DD MMMM YYYY'),
    },
    {
      title: 'End Date',
      dataIndex: ['foreign_data', 'end_date'],
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
            <Tooltip placement="bottomRight" title="Approve Campaign">
              <Button
                style={{ color: '#87d068', border: 'solid 0px' }}
                onClick={() => approvalBanner(value, 'accept')}
                disabled={value.status === 'accept'}
              >
                <CheckOutlined />
              </Button>
            </Tooltip>
            <Tooltip placement="bottomRight" title="Reject Campaign">
              <Button
                style={{ color: '#f50', border: 'solid 0px' }}
                onClick={() => approvalBanner(value, 'rejected')}
                disabled={
                  value.status === 'accept' || value.status === 'rejected'
                }
              >
                {/* <CheckOutlined /> */}
                <CloseOutlined />
              </Button>
            </Tooltip>
            <Tooltip placement="bottomRight" title="Detail Approval Campaign">
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

const ModerationBanner = () => {
  const searchParams = useSearchParams()
  const [visible, setVisible] = useState<boolean>(false)
  const [campaignData, setCampaignData] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const current = searchParams.get('current')
  const pageSize = searchParams.get('pageSize')

  const init = async (
    current?: number | string,
    pageSize?: number | string
  ) => {
    const queryParams = {
      page: Number(current) || 1,
      rows: Number(pageSize) || 10,
    }
    const dataCharity = await getApprovalBanner(queryParams)
    const result = {
      data: dataCharity.data,
      meta: dataCharity.meta,
    }
    return result
  }

  const showModal = (record: any) => {
    setCampaignData(record)
    setVisible(true)
  }

  const approvalBanner: any = async (data?: any, status?: Status) => {
    try {
      setLoading(true)
      const dataApproval = {
        id: data.foreign_data._id,
        status,
      }
      // console.log(data)
      await updateBannerStatus(dataApproval)
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      console.log(error)
      const errorResponse = error.response
      notify(
        'error',
        'Something went wrong',
        errorResponse?.data?.error?.error?.message || '',
        'bottomRight'
      )
    }
  }
  return (
    <div>
      <Spin tip="Loading" spinning={loading}>
        <CustomTable
          columns={getColumns(showModal, approvalBanner)}
          init={init}
          loading={loading}
          hideAddButton={true}
        />
        <MemoizeModalTable
          open={visible}
          setOpen={setVisible}
          data={campaignData}
          setData={setCampaignData}
        />
      </Spin>
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
  const { status, end_date } = props?.data?.foreign_data

  let campaignStatus = CAMPAIGN_STATUS_WITH_COLORS.find(
    (item) => item.status === status
  )

  return (
    <Modal
      onCancel={handleCancel}
      open={props.open}
      footer={null}
      closable={true}
      maskClosable={true}
    >
      <Descriptions bordered className="mt-4">
        <Descriptions.Item label="Title" span={24}>
          {props?.data?.foreign_data.title}
        </Descriptions.Item>
        <Descriptions.Item label="Image" span={24}>
          <Image
            src={props?.data?.foreign_data.image}
            alt={props?.data?.foreign_data.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={24}>
          <Tag color={campaignStatus?.color}>{campaignStatus?.label}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Start Date" span={24}>
          {dayjs(props?.data?.foreign_data.start_date).format('DD MMMM YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="End Date" span={24}>
          {dayjs(props?.data?.foreign_data.end_date).format('DD MMMM YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="Redirection Link" span={24}>
          <Link
            href={props?.data?.foreign_data.redirection_link}
            target="_blank"
          >
            {props?.data?.foreign_data.redirection_link}
          </Link>
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}

export default ModerationBanner
