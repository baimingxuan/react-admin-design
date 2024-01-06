export interface APIResult {
  list: any[]
  total: number
}

export interface PageState {
  current: number
  pageSize: number
}

export interface TableDataType {
  id: number
  name: string
  sex: string
  phone: number
  education: string
  married: number
  forbid: boolean
  hobby: string[]
}
