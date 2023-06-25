import { PlusOutlined } from '@ant-design/icons'
import { Input } from 'antd'

import CustomButton from 'components/atoms/Button'
import React from 'react'

const { Search } = Input

interface IProps {
  placeholder: string
  onSearch: VoidFunction
  pathname: string
}

const TableHeader = (props: IProps) => {
  return (
    <div className="table-header mb-3 flex justify-between">
      <div className="table-header-left">
        <Search
          placeholder={props?.placeholder || 'Input Search Text'}
          onSearch={props.onSearch}
          style={{ width: 200 }}
        />
      </div>
      <div className="table-header-right">
        <CustomButton
          islink={'true'}
          href={`${props.pathname}/add`}
          className=" flex items-center justify-center text-sm"
        >
          <PlusOutlined />
        </CustomButton>
      </div>
    </div>
  )
}

export default TableHeader
