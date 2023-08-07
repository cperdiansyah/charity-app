'use client'
import {
  Button,
  Descriptions,
  Modal,
  ModalFuncProps,
  Image,
  Tag,
  Tooltip,
} from 'antd'
import dayjs from 'dayjs'
import Link from 'next/link'
import React, { useState } from 'react'
import { EditOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { useSearchParams } from 'next/navigation'

import CustomTable from '@/components/organisms/Table'
// import { getBannerClient } from '@/services/banner/clientService'
import { getRewardClient } from '@/services/reward/clientService'

import useUpdated from '@/hooks/useUpdated'
import { IModalTable } from './reward.interface'
import { NAVIGATION_LINK } from '@/utils/link'
import { formatNumber } from '@/app/sedekah-subuh/PoinInfo'

import styles from './style.module.scss'

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
        return (
          <div className="flex items-center">
            <Tooltip placement="bottomRight" title="Edit Banner">
              <Link
                href={`${NAVIGATION_LINK.RewardEdit}${value._id}`}
                className="px-3 py-2"
              >
                <EditOutlined />
              </Link>
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

const MemoizeModalTable = React.memo(ModalTable)

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
      {/* <CustomTable columns={getColumns(showModal)} init={init} /> */}
      <CustomTable columns={getColumns(showModal)} init={init} />
      <MemoizeModalTable
        open={visible}
        setOpen={setVisible}
        data={RewardData}
        setData={setRewardData}
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

  const { status, end_date } = props?.data
  const isStatusActive = dayjs(end_date) > dayjs() && status === 'active'
  const color = isStatusActive ? 'green' : 'volcano'
  const text = isStatusActive ? 'ACTIVE' : 'INACTIVE'

  useUpdated(() => {
    if (!props.open) {
      resetData()
    }
  }, [props.open])

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
          {props?.data?.title}
        </Descriptions.Item>
        <Descriptions.Item label="Image" span={24}>
          <Image
            src={props?.data?.image}
            alt={props?.data?.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={24}>
          <Tag color={color}>{text}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Start Date" span={24}>
          {dayjs(props?.data?.start_date).format('DD MMMM YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="End Date" span={24}>
          {dayjs(props?.data?.end_date).format('DD MMMM YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="Redirection Link" span={24}>
          <Link href={props?.data?.redirection_link} target="_blank">
            {props?.data?.redirection_link}
          </Link>
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}

export default AdminRewward
