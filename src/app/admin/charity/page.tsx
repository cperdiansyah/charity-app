'use client'
import { Space, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import CustomTable from 'components/organisms/Table'
import { DataType } from 'components/organisms/Table/table.interface'
import React from 'react'
import { getCharity } from 'services/charity/serverService'
const columns: ColumnsType<DataType> = [
  {
    dataIndex: 'name',
    key: 'name',
    title: 'Name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === 'loser') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
]

const AdminCharity = async () => {
  // const charity = await getCharity()

  // console.log(charity)

  return (
    <div>
      <CustomTable columns={columns} />
    </div>
  )
}

export default AdminCharity
