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
import { getApprovalCharity } from '@/services/moderation/clientService'
import { IModalTable } from '../../campaign/campaign.interfce'
import { CAMPAIGN_STATUS_WITH_COLORS } from '../../campaign/campaign'
import { updateCharityStatus } from '@/services/charity/clientService'
import { notify } from '@/helpers/notify'

type Status = 'accept' | 'rejected'

function getColumns(
  showModal: any,
  approvalCampaign: (data?: string, status?: Status) => VoidFunction,
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
      title: 'Donation Target',
      dataIndex: ['foreign_data', 'donation_target'],
      key: 'donation_target',

      render: (data: number) => `${currencyFormat(data)}`,
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
                onClick={() => approvalCampaign(value, 'accept')}
                disabled={value.status === 'accept'}
              >
                <CheckOutlined />
              </Button>
            </Tooltip>
            <Tooltip placement="bottomRight" title="Reject Campaign">
              <Button
                style={{ color: '#f50', border: 'solid 0px' }}
                onClick={() => approvalCampaign(value, 'rejected')}
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

const ModerationCampaign = () => {
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
      page: current || 1,
      rows: pageSize || 10,
    }
    const dataCharity = await getApprovalCharity(queryParams)
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

  const approvalCampaign: any = async (data?: any, status?: Status) => {
    try {
      setLoading(true)
      const dataApproval = {
        id: data.foreign_data._id,
        status,
      }
      await updateCharityStatus(dataApproval)
      setLoading(false)
      notify('success', 'Update status success', '', 'bottomRight')

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
          columns={getColumns(showModal, approvalCampaign)}
          init={init}
          loading={loading}
          hideAddButton={true}
          hideSearchField
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
  const { status } = props?.data?.foreign_data
  let campaignStatus = CAMPAIGN_STATUS_WITH_COLORS.find(
    (item) => item.label === status
  )

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
          {props?.data?.foreign_data?.title}
        </Descriptions.Item>
        <Descriptions.Item label="Image" span={24}>
          <Image
            src={_get(props?.data, 'foreign_data.media[0].content')}
            alt={props?.data?.foreign_data?.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Descriptions.Item>
        <Descriptions.Item label="Donation Target" span={24}>
          {`${currencyFormat(props?.data?.foreign_data?.donation_target)}`}
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
          {dayjs(props?.data?.foreign_data?.start_date).format('DD MMMM YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="End Date" span={24}>
          {dayjs(props?.data?.foreign_data?.end_date).format('DD MMMM YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="Post Date" span={24}>
          {props?.data?.foreign_data?.post_date
            ? dayjs(props?.data?.foreign_data?.post_date).format('DD MMMM YYYY')
            : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="Description" span={24}>
          <div
            dangerouslySetInnerHTML={{
              __html: props?.data?.foreign_data?.description,
            }}
          ></div>
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}

export default ModerationCampaign
