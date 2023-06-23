'use client'

import { Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import CustomTable from 'components/organisms/Table'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { getBannerClient } from 'services/banner/clientService'

const columns: ColumnsType<any> = [
  {
    dataIndex: 'title',
    key: 'title',
    title: 'Title',
  },
  {
    title: 'Status',
    key: 'status',
    render: (value) => {
      const { status, end_date } = value
      let isStatusActive

      if (end_date <= dayjs()) {
        isStatusActive = false
      } else {
        if (status === 'active') {
          isStatusActive = true
        } else {
          isStatusActive = false
        }
      }
      let color = isStatusActive ? 'green' : 'volcano'
      return <Tag color={color}>{isStatusActive ? 'ACTIVE' : 'INACTIVE'}</Tag>
    },
  },
  {
    title: 'Start Date',
    dataIndex: 'start_date',
    key: 'start_date',
    render: (date) => dayjs(date).format('DD MMMM YYYY'),
  },
  {
    title: 'End Date',
    dataIndex: 'end_date',
    key: 'end_date',
    render: (date) => dayjs(date).format('DD MMMM YYYY'),
  },

  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (_, record) => (
  //     <Space size="middle">
  //       <a>Invite {record.name}</a>
  //       <a>Delete</a>
  //     </Space>
  //   ),
  // },
]

const AdminBanner = () => {
  const init = async () => {
    const dataBanner = await getBannerClient()
    // console.log(dataBanner)
    return dataBanner.banner
  }

  useEffect(() => {
    init()
  }, [])
  return (
    <div>
      <CustomTable columns={columns} init={init} />
    </div>
  )
}

export default AdminBanner
