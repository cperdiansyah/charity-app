import { Space, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import CustomTable, { DataType } from 'components/organisms/Table'
import React from 'react'
import { getCharity } from 'services/charity/serverService'


const AdminCharity = async () => {
  const charity = await getCharity()

  // console.log(charity)

  return (
    <div>
      Admin chairut
      {/* <CustomTable columns={columns} /> */}
    </div>
  )
}

export default AdminCharity
