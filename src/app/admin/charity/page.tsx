'use client'
import { Space, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import CustomTable from 'components/organisms/Table'
// import { DataType } from 'components/organisms/Table/table.interface'
import { currencyFormat } from 'helpers'
import React, { useEffect, useState } from 'react'
import { getCharityClient } from 'services/charity/clientService'

const columns: ColumnsType<any> = [
  {
    dataIndex: 'title',
    key: 'title',
    title: 'Title',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Donation Target',
    dataIndex: 'donation_target',
    key: 'donation_target',
    render: (data) => currencyFormat(data),
  },
  // {
  //   title: 'Tags',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: (_, { tags }) => (
  //     <>
  //       {tags.map((tag) => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green'
  //         if (tag === 'loser') {
  //           color = 'volcano'
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         )
  //       })}
  //     </>
  //   ),
  // },
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

interface ICharityResponse {
  charity: any
  meta: any
}

const AdminCharity = async () => {
  const [loading, setLoading] = useState(false)
  const [charity, setCharity] = useState<ICharityResponse | undefined>()
  useEffect(() => {
    asyncMethod()
  }, [])

  const asyncMethod = async () => {
    setLoading(true)
    const dataCharity = await getCharityClient()
    // console.log(dataCharity)
    // setCharity(dataCharity)
    setLoading(false)
    return dataCharity.charity
  }

  // console.log(charity)
  if (loading) return <>Loading......</>

  return (
    <div>
      <CustomTable
        columns={columns}
        // datasources={charity?.charity}
        init={asyncMethod}
        loading={loading}
      />
    </div>
  )
}

export default AdminCharity
