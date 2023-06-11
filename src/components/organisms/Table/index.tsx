import React, { useState, useEffect } from 'react'
import { Space, Table, Tag, Input } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { FilterValue, SorterResult } from 'antd/es/table/interface'
import Column from 'antd/es/table/Column'
import { DataType, ICustomTable, TableParams } from './table.interface'

const { Search } = Input

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
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

const datas: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]

const CustomTable: React.FC<ICustomTable> = ({ columns, datasources }) => {
  const [data, setData] = useState<DataType[]>()
  const [loading, setLoading] = useState(false)
  const [page, setPage] = React.useState(1)

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  })

  useEffect(() => {
    // fetchData()
    setData(datas)
  }, [])

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<DataType>
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
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{ width: 200 }}
      />

      <Table
        columns={columns}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        // dataSource={datasources}
        // dataSource={datasources}
        // rowKey={(data) => data.}

        // onChange={handleTableChange}
      >
        <Column
          title="Index"
          key="index"
          render={(value, item, index) => (page - 1) * 10 + index}
        />
      </Table>
    </div>
  )
}

export default CustomTable
