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
import {
  getApprovalCharity,
  getApprovalUser,
} from '@/services/moderation/clientService'
import { IModalTable } from '../../campaign/campaign.interfce'
import { CAMPAIGN_STATUS_WITH_COLORS } from '../../campaign/campaign'
import { notify } from '@/helpers/notify'
import { updateUserStatus } from '@/services/user/clientService'
import Link from 'next/link'

type Status = 'accept' | 'rejected'

function getColumns(
  showModal: any,
  approvalUser: (data?: string, status?: Status) => VoidFunction,
  rejectedCampaign?: VoidFunction
) {
  return [
    {
      dataIndex: ['foreign_data', 'name'],
      key: 'name',
      title: 'Name',
      width: 250,
    },

    {
      title: 'Status',
      dataIndex: 'status',
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
      dataIndex: ['foreign_data', 'username'],
      key: 'username',
      title: 'Username',
      width: 100,
    },
    {
      dataIndex: ['foreign_data', 'email'],
      key: 'email',
      title: 'Email',
      width: 100,
    },
    {
      title: 'Register Date',
      dataIndex: ['foreign_data', 'createdAt'],
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('DD MMMM YYYY  HH:mm'),
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
                onClick={() => approvalUser(value, 'accept')}
                disabled={value.status === 'accept'}
              >
                <CheckOutlined />
              </Button>
            </Tooltip>
            <Tooltip placement="bottomRight" title="Reject Campaign">
              <Button
                style={{ color: '#f50', border: 'solid 0px' }}
                onClick={() => approvalUser(value, 'rejected')}
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

const ModerationUser = () => {
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
    const dataCharity = await getApprovalUser(queryParams)
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

  const approvalUser: any = async (data?: any, status?: Status) => {
    try {
      setLoading(true)
      const dataApproval = {
        id: data.foreign_data._id,
        status,
      }
      await updateUserStatus(dataApproval)
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
          columns={getColumns(showModal, approvalUser)}
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
  const status = props?.data?.status

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
      <Descriptions bordered className="mt-4">
        <Descriptions.Item label="Name" span={24}>
          {props?.data?.foreign_data?.name}
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

        <Descriptions.Item label="Username" span={24}>
          {props?.data?.foreign_data?.username}
        </Descriptions.Item>
        <Descriptions.Item label="Email" span={24}>
          {props?.data?.foreign_data?.email}
        </Descriptions.Item>
        <Descriptions.Item label="Register Date" span={24}>
          {dayjs(props?.data?.foreign_data?.start_date).format('DD MMMM YYYY')}
        </Descriptions.Item>

        <Descriptions.Item label="Description" span={24}>
          <div
            dangerouslySetInnerHTML={{
              __html: props?.data?.approval_user_data?.description,
            }}
          ></div>
        </Descriptions.Item>

        {props?.data?.approval_user_data?.file_url && (
          <Descriptions.Item label="Proposal File" span={24}>
            <Link
              href={props?.data?.approval_user_data?.file_url || ''}
              target="_blank"
            >
              {props?.data?.approval_user_data?.file_url || ''}
            </Link>
          </Descriptions.Item>
        )}
      </Descriptions>
    </Modal>
  )
}

export default ModerationUser
