import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import { Table, Input } from 'antd'
import { PlusOutlined, PlusCircleOutlined } from '@ant-design/icons'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { FilterValue, SorterResult } from 'antd/es/table/interface'
import Column from 'antd/es/table/Column'

import CustomButton from 'components/atoms/Button'

import { ICustomTable, TableParams } from './table.interface'
import { usePathname } from 'next/navigation'
import useLogoutSessionExpired from 'hooks/useLogoutSessionExpired'
import TableHeader from './tableHeader'

const { Search } = Input

// const columns: ColumnsType<DataType> = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name',
//     render: (text) => <a>{text}</a>,
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//     key: 'age',
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//     key: 'address',
//   },
//   {
//     title: 'Tags',
//     key: 'tags',
//     dataIndex: 'tags',
//     render: (_, { tags }) => (
//       <>
//         {tags.map((tag) => {
//           let color = tag.length > 5 ? 'geekblue' : 'green'
//           if (tag === 'loser') {
//             color = 'volcano'
//           }
//           return (
//             <Tag color={color} key={tag}>
//               {tag.toUpperCase()}
//             </Tag>
//           )
//         })}
//       </>
//     ),
//   },
//   {
//     title: 'Action',
//     key: 'action',
//     render: (_, record) => (
//       <Space size="middle">
//         <a>Invite {record.name}</a>
//         <a>Delete</a>
//       </Space>
//     ),
//   },
// ]

const CustomTable: React.FC<ICustomTable> = ({
  columns,
  // datasources,
  // loading,
  init,
  placeholder,
}) => {
  const pathname = usePathname()
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<any>()
  const [page, setPage] = React.useState(1)
  const logoutSessionExpiredHooks = useLogoutSessionExpired()

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      pageSizeOptions: ['10', '20', '50', '100'],
      // showTotal
    },
  })

  const pageSize = tableParams?.pagination?.pageSize || 10
  const [coloumn, setColoumn] = useState<ColumnsType<any>>([
    {
      title: 'No.',
      key: 'no',
      render: (value: any, item: any, index: any) => {
        return (page - 1) * pageSize + index + 1
      },
      width: '25px',
    },
    ...columns,
  ])

  useEffect(() => {
    if (!loading) {
      getData()
    }
  }, [])

  const getData = async () => {
    setLoading(true)
    try {
      const tableData = await init()
      // console.log(tableData)
      if (!_.isEmpty(tableData)) {
        setData(tableData)
      } else {
        setData([])
      }

      setLoading(false)
    } catch (error: any) {
      const { status } = error.response
      if (status === 403) {
        logoutSessionExpiredHooks()
      }
      setLoading(false)
    }
  }

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<any>
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    })

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([])
    }
  }
  const onSearch: any = (value: string) => {
    console.log(value)
    return data
  }
  return (
    <div className="table-container">
      <TableHeader
        onSearch={onSearch}
        pathname={pathname}
        placeholder={placeholder || ''}
      />

      <div className="table-content">
        <Table
          columns={coloumn}
          dataSource={data}
          pagination={tableParams.pagination}
          loading={loading}
          rowKey={(data) => data?._id}

          // onChange={handleTableChange}
        />
      </div>
    </div>
  )
}

export default CustomTable
