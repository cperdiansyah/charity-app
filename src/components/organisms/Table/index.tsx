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
  const pathame = usePathname()
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<any>()
  const [page, setPage] = React.useState(1)

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
    getData()
  }, [])

  const getData = async () => {
    setLoading(true)
    const tableData = await init()
    // console.log(tableData)
    if (!_.isEmpty(tableData)) {
      setData(tableData)
    } else {
      setData([])
    }
    setLoading(false)
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
      <div className="table-header mb-3 flex justify-between">
        <div className="table-header-left">
          <Search
            placeholder={placeholder || 'Input Search Text'}
            onSearch={onSearch}
            style={{ width: 200 }}
          />
        </div>
        <div className="table-header-right">
          <CustomButton
            islink={'true'}
            href={`${pathame}/add`}
            className=" flex items-center justify-center text-sm"
          >
            <PlusOutlined />
          </CustomButton>
        </div>
      </div>
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
