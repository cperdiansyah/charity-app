import _ from 'lodash'
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Table } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { FilterValue, SorterResult } from 'antd/es/table/interface'

import { ICustomTable, TableParams } from './table.interface'
import { usePathname, useRouter } from 'next/navigation'
import useLogoutSessionExpired from '@/hooks/useLogoutSessionExpired'
import TableHeader from './tableHeader'
import useUpdated from '@/hooks/useUpdated'

const CustomTable: React.FC<ICustomTable> = ({
  columns,
  init,
  placeholder,
  loading: loadingProps,
}) => {
  const pathname = usePathname()
  const router = useRouter()

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

  /*   useEffect(() => {
    if (!loading) {
      MemoGetData()
    }
  }, []) */

  useUpdated(() => {
    if (!loading) {
      MemoGetData()
    }
  }, [])

  useUpdated(() => {
    if (!loadingProps) {
      MemoGetData()
    }
  }, [loadingProps])

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
      ...pagination,
      ...filters,
      ...sorter,
      pagination,
      filters,
    })

    const params = convertTableParams({
      current: pagination.current,
      pageSize: pagination.pageSize,
    })

    router.push(`?${params}`)

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([])
    }
  }

  const onSearch: any = (value: string) => {
    console.log(value)
    return data
  }

  const convertTableParams = (data: TablePaginationConfig) => {
    const params = new URLSearchParams()

    Object.entries(data)?.forEach(([key, value]) => {
      params.append(key, value)
    })
    // const queryParams = params.toString()
    // return queryParams
    return params
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
