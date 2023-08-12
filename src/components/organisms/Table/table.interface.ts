import { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { FilterValue } from 'antd/es/table/interface'

export interface ICustomTable {
  columns: ColumnsType<any> | any
  datasources?: any[]
  init: Function
  loading?: boolean
  placeholder?: string
  hideAddButton?: boolean
  hideSearchField?:boolean
}

export interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: Record<string, FilterValue>
}

// export interface DataType {
//   id: Key
//   key: string
//   name: string
//   age: number
//   address: string
//   tags: string[]
// }
