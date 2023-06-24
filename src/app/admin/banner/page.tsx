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
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { EditOutlined, InfoCircleOutlined } from '@ant-design/icons'

import CustomTable from 'components/organisms/Table'
import { getBannerClient } from 'services/banner/clientService'

function getColumns(showModal: any) {
  return [
    {
      dataIndex: 'title',
      key: 'title',
      title: 'Title',
    },
    {
      title: 'Status',
      key: 'status',
      render: (value: any) => {
        const { status, end_date } = value
        const isStatusActive = dayjs(end_date) > dayjs() && status === 'active'
        const color = isStatusActive ? 'green' : 'volcano'
        const text = isStatusActive ? 'ACTIVE' : 'INACTIVE'

        return <Tag color={color}>{text}</Tag>
      },
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
      key: 'operation',
      fixed: 'right',
      width: 150,

      render: (value: any, record: any) => {
        return (
          <div className="flex items-center">
            <Tooltip placement="bottomRight" title="Edit Banner">
              <Link href={`banner/edit/${value._id}`} className="px-3 py-2">
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

const AdminBanner = () => {
  const [visible, setVisible] = useState(false)
  const [bannerData, setBannerData] = useState<any>()

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    const dataBanner = await getBannerClient()
    return dataBanner.banner
  }
  const showModal = (record: any) => {
    setBannerData(record)
    setVisible(true)
  }

  return (
    <div>
      <CustomTable columns={getColumns(showModal)} init={init} />
      <ModalTable open={visible} setOpen={setVisible} data={bannerData} />
    </div>
  )
}

interface IModalTable extends ModalFuncProps {
  open: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
  data: any
}

const ModalTable = (props: IModalTable) => {
  if (props?.data === undefined) return <></>

  const handleCancel = (e: any) => {
    e.stopPropagation()
    if (props?.setOpen) props?.setOpen(false)
  }

  const { status, end_date } = props?.data
  const isStatusActive = dayjs(end_date) > dayjs() && status === 'active'
  const color = isStatusActive ? 'green' : 'volcano'
  const text = isStatusActive ? 'ACTIVE' : 'INACTIVE'

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
           src={props.data.image}
            alt={props?.data?.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={24}>
          <Tag color={color}>{text}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Start Date" span={24}>
          {dayjs(props.data.start_date).format('DD MMMM YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="End Date" span={24}>
          {dayjs(props.data.end_date).format('DD MMMM YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="Redirection Link" span={24}>
          <Link href={props.data.redirection_link}>
            {props.data.redirection_link}
          </Link>
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}

export default AdminBanner
