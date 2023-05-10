export interface MetaProps {
  title: string
  key?: string
  icon?: string
  keepAlive?: boolean
  orderNo?: number
}

export interface AppRoute {
  element?: React.ReactNode
  path?: string
  children?: AppRoute[]
  index?: boolean
  meta?: MetaProps
}