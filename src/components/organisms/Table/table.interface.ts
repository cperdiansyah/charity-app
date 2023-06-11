import { ColumnsType, TablePaginationConfig } from "antd/es/table"
import { FilterValue } from "antd/es/table/interface"

export interface ICustomTable {
  columns: ColumnsType<DataType>
  datasources?: DataType[]
}

export interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: Record<string, FilterValue>
}


export interface DataType {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}