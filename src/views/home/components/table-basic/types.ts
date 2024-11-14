export interface APIResult {
  list: any[]
  total: number
}

export interface PageState {
  current: number
  pageSize: number
}

export interface TableAllDataType {
  id: number
  create_time: string
  user_number: number
  information_number: number
  news_flash_number: number
  ai_number: number
}
