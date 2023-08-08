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
import { getBannerClient } from '@/services/banner/clientService'
import useUpdated from '@/hooks/useUpdated'
import { IModalTable } from './banner.interface'
import { NAVIGATION_LINK } from '@/utils/link'

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
        const isStatusActive = dayjs(end_date) > dayjs() && status === 'accept'
        // console.log(isStatusActive)
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
              <Link
                href={`${NAVIGATION_LINK.BannerEdit}${value._id}`}
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

const AdminBanner = () => {
  const searchParams = useSearchParams()
  const [visible, setVisible] = useState(false)
  const [bannerData, setBannerData] = useState<any>()

  const current = searchParams.get('current')
  const pageSize = searchParams.get('pageSize')
  const queryParams = {
    page: Number(current) || 1,
    rows: Number(pageSize) || 10,
  }

  const init = async (
    current?: number | string,
    pageSize?: number | string
  ) => {
    const queryParams = {
      page: Number(current) || 1,
      rows: Number(pageSize) || 10,
    }

    const dataBanner = await getBannerClient(queryParams)

    const result = {
      data: dataBanner.banner,
      meta: dataBanner.meta,
    }
    return result
  }

  const showModal = (record: any) => {
    setBannerData(record)
    setVisible(true)
  }

  return (
    <div>
      {/* <CustomTable columns={getColumns(showModal)} init={init} /> */}
      <CustomTable columns={getColumns(showModal)} init={init} />
      <MemoizeModalTable
        open={visible}
        setOpen={setVisible}
        data={bannerData}
        setData={setBannerData}
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
  const isStatusActive = dayjs(end_date) > dayjs() && status === 'accept'
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

export default AdminBanner
