'use client'
import { Button, Spin, Tag, Tooltip } from 'antd'
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

import { getApprovalUser } from '@/services/moderation/clientService'
import { notify } from '@/helpers/notify'
import { updateUserStatus } from '@/services/user/clientService'
import { CAMPAIGN_STATUS_WITH_COLORS } from '../campaign/campaign'
import {
  getExchangeRequestList,
  updateExchangeRequest,
} from '@/services/reward/exchange'

type Status = 'accept' | 'rejected'

function getColumns(
  showModal: any,
  approvalExchangeReward: (data?: string, status?: Status) => VoidFunction,
  rejectedCampaign?: VoidFunction
) {
  return [
    {
      dataIndex: ['reward_id', 'name'],
      key: 'rewardname',
      title: 'Reward Name',
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
      dataIndex: ['user_id', 'name'],
      key: 'name',
      title: 'User Name',
    },
    {
      dataIndex: ['user_id', 'email'],
      key: 'email',
      title: 'User Email',
    },

    {
      title: 'Exchange Date',
      dataIndex: ['createdAt'],
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
            <Tooltip placement="bottomRight" title="Approve Exchange">
              <Button
                style={{ color: '#87d068', border: 'solid 0px' }}
                onClick={() => approvalExchangeReward(value, 'accept')}
                disabled={value.status === 'accept'}
              >
                <CheckOutlined />
              </Button>
            </Tooltip>
            <Tooltip placement="bottomRight" title="Reject Exchange">
              <Button
                style={{ color: '#f50', border: 'solid 0px' }}
                onClick={() => approvalExchangeReward(value, 'rejected')}
                disabled={
                  value.status === 'accept' || value.status === 'rejected'
                }
              >
                {/* <CheckOutlined /> */}
                <CloseOutlined />
              </Button>
            </Tooltip>
          </div>
        )
      },
    },
  ]
}

// const MemoizeModalTable = React.memo(ModalTable)

const ExchangeReward = () => {
  const searchParams = useSearchParams()
  const [visible, setVisible] = useState<boolean>(false)
  const [campaignData, setCampaignData] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)

  const init = async (
    current?: number | string,
    pageSize?: number | string
  ) => {
    const queryParams = {
      page: current || 1,
      rows: pageSize || 10,
    }
    const dataCharity = await getExchangeRequestList(queryParams)
    const result = {
      data: dataCharity.data,
      meta: dataCharity.meta,
    }
    console.log(result)

    return result
  }

  const showModal = (record: any) => {
    setCampaignData(record)
    setVisible(true)
  }

  const approvalExchangeReward: any = async (data?: any, status?: Status) => {
    try {
      setLoading(true)
      const dataApproval = {
        id: data._id,
        status,
      }
      await updateExchangeRequest(dataApproval)
      notify('success', 'Update status success', '', 'bottomRight')
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
          columns={getColumns(showModal, approvalExchangeReward)}
          init={init}
          loading={loading}
          hideAddButton={true}
          hideSearchField
        />
        {/* <MemoizeModalTable
          open={visible}
          setOpen={setVisible}
          data={campaignData}
          setData={setCampaignData}
        /> */}
      </Spin>
    </div>
  )
}

// function ModalTable(props: IModalTable) {
//   if (props?.data === undefined) return <></>

//   const handleCancel = (e: any) => {
//     e.stopPropagation()
//     if (props?.setOpen) props?.setOpen(false)
//   }

//   const resetData = (e?: any) => {
//     setTimeout(() => {
//       if (props?.setData) props?.setData()
//     }, 500)
//   }

//   useUpdated(() => {
//     if (!props.open) {
//       resetData()
//     }
//   }, [props.open])

//   /* Status */
//   const status = props?.data?.status

//   let campaignStatus = CAMPAIGN_STATUS_WITH_COLORS.find(
//     (item) => item.label === status
//   )

//   return (
//     <Modal
//       onCancel={handleCancel}
//       open={props.open}
//       footer={null}
//       closable={true}
//       maskClosable={true}
//     >
//       <Descriptions bordered className="mt-4">
//         <Descriptions.Item label="Name" span={24}>
//           {props?.data?.foreign_data?.name}
//         </Descriptions.Item>
//         <Descriptions.Item label="Status" span={24}>
//           {campaignStatus ? (
//             <Tag color={campaignStatus?.color}>
//               {campaignStatus?.status?.toUpperCase()}
//             </Tag>
//           ) : (
//             <Tag color="default">{status?.toUpperCase()}</Tag>
//           )}
//         </Descriptions.Item>

//         <Descriptions.Item label="Username" span={24}>
//           {props?.data?.foreign_data?.username}
//         </Descriptions.Item>
//         <Descriptions.Item label="Email" span={24}>
//           {props?.data?.foreign_data?.email}
//         </Descriptions.Item>
//         <Descriptions.Item label="Register Date" span={24}>
//           {dayjs(props?.data?.foreign_data?.start_date).format('DD MMMM YYYY')}
//         </Descriptions.Item>

//         <Descriptions.Item label="Description" span={24}>
//           <div
//             dangerouslySetInnerHTML={{
//               __html: props?.data?.approval_user_data?.description,
//             }}
//           ></div>
//         </Descriptions.Item>

//         {props?.data?.approval_user_data?.file_url && (
//           <Descriptions.Item label="Proposal File" span={24}>
//             <Link
//               href={props?.data?.approval_user_data?.file_url || ''}
//               target="_blank"
//             >
//               {props?.data?.approval_user_data?.file_url || ''}
//             </Link>
//           </Descriptions.Item>
//         )}
//       </Descriptions>
//     </Modal>
//   )
// }

export default ExchangeReward
