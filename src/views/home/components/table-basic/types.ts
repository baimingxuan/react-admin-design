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
  time: number
  user: number
  information: number
  news_flash: number
  ai: number
}
