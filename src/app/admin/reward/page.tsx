'use client'
import { Button, Image, Tooltip, Form } from 'antd'
import dayjs from 'dayjs'
import Link from 'next/link'
import React, { useState } from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useSearchParams } from 'next/navigation'

import CustomTable from '@/components/organisms/Table'
// import { getBannerClient } from '@/services/banner/clientService'
import {
  deleteRewardClient,
  getRewardClient,
} from '@/services/reward/clientService'

import { NAVIGATION_LINK } from '@/utils/link'
import { formatNumber } from '@/app/sedekah-subuh/PoinInfo'

import styles from './style.module.scss'
import { notify } from '@/helpers/notify'

function getColumns(showModal: any) {
  return [
    {
      dataIndex: 'name',
      key: 'name',
      title: 'Name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (data: any) => formatNumber(data),
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (data: string) => (
        <div className={`${styles['image-cell']}`}>
          <Image
            src={data}
            alt="image"
            sizes="(max-width: 768px) 30vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 150,

      render: (value: any, record: any) => {
        const onFinish = async () => {
          try {
            await deleteRewardClient(value)
            location.reload()
          } catch (error) {
            console.log(error)
            notify('error', 'Something went wrong', '', 'bottomRight')
          }
        }
        return (
          <div className="flex items-center">
            <Tooltip placement="bottomRight" title="Edit Reward">
              <Link
                href={`${NAVIGATION_LINK.RewardEdit}${value._id}`}
                className="px-3 py-2"
              >
                <EditOutlined />
              </Link>
            </Tooltip>
            <Tooltip placement="bottomRight" title="Delete Reward">
              <Form onFinish={onFinish}>
                <Button className="border-none" htmlType="submit">
                  {/* <EditOutlined />
                  <DeleteOutlined /> */}
                  <DeleteOutlined />
                </Button>
              </Form>
            </Tooltip>
            {/* <Tooltip placement="bottomRight" title="Detail Banner">
              <Button
                style={{ color: '#1890ff', border: 'solid 0px' }}
                onClick={() => showModal(record)}
              >
                <InfoCircleOutlined />
              </Button>
            </Tooltip> */}
          </div>
        )
      },
    },
  ]
}

// const MemoizeModalTable = React.memo(ModalTable)

const AdminRewward = () => {
  const searchParams = useSearchParams()
  const [visible, setVisible] = useState(false)
  const [RewardData, setRewardData] = useState<any>()

  const init = async (
    current?: number | string,
    pageSize?: number | string
  ) => {
    const queryParams = {
      page: Number(current) || 1,
      rows: Number(pageSize) || 10,
    }

    const dataReward = await getRewardClient(queryParams)

    const result = {
      data: dataReward.data,
      meta: dataReward.meta,
    }
    return result
  }

  const showModal = (record: any) => {
    setRewardData(record)
    setVisible(true)
  }

  return (
    <div>
      <CustomTable columns={getColumns(showModal)} init={init} />
    </div>
  )
}

export default AdminRewward
