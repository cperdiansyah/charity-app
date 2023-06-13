import React, { useState, useEffect } from 'react'
import { Space, Table, Tag, Input } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { FilterValue, SorterResult } from 'antd/es/table/interface'
import Column from 'antd/es/table/Column'
import { ICustomTable, TableParams } from './table.interface'
import _ from 'lodash'

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
  datasources,
  loading,
  init,
}) => {
  const [data, setData] = useState<any>()
  // const [loading, setLoading] = useState(false)
  const [page, setPage] = React.useState(1)
  // console.log(datasources)

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  })
  // console.log(datasources)

  useEffect(() => {
    // fetchData()
    getData()
  }, [])

  const getData = async () => {
    const tableData = await init()
    // console.log(tableData)
    if (!_.isEmpty(tableData)) {
      setData(tableData)
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
  const onSearch = (value: string) => console.log(value)

  return (
    <div className="table-container">
      <div className="table-header mb-3">
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{ width: 200 }}
        />
      </div>
      <div className="table-content">
        <Table
          columns={columns}
          dataSource={data}
          pagination={tableParams.pagination}
          loading={loading}
          rowKey={(data) => data?.id}

          // onChange={handleTableChange}
        >
          <Column
            title="Index"
            key="index"
            render={(value, item, index) => (page - 1) * 10 + index}
          />
        </Table>
      </div>
    </div>
  )
}

export default CustomTable
