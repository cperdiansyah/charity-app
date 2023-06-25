import _ from 'lodash'
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Table } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { FilterValue, SorterResult } from 'antd/es/table/interface'

import { ICustomTable, TableParams } from './table.interface'
import { usePathname } from 'next/navigation'
import useLogoutSessionExpired from 'hooks/useLogoutSessionExpired'
import TableHeader from './tableHeader'

const CustomTable: React.FC<ICustomTable> = ({
  columns,
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
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '50', '100'],
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
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
      MemoGetData()
    }
  }, [])

  const MemoGetData = useCallback(async () => {
    return await getData()
  }, [])

  async function getData() {
    try {
      setLoading(true)
      const tableData = await init()
      if (!_.isEmpty(tableData)) {
        // console.log(tableData)
        setData(tableData.data)
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            current: tableData.meta.page,
            pageSize: tableData.meta.rows,
            total: tableData.meta.total,
          },
        })
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

  const handleTableChange: any = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<any>
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    })

    console.log({
      pagination,
      filters,
      sorter,
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
          onChange={handleTableChange}
        />
      </div>
    </div>
  )
}
export default React.memo(CustomTable)
