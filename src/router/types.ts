export interface MetaProps {
  title: string
  key?: string
  icon?: string
  keepAlive?: boolean
}

export interface AppRoute {
  element?: React.ReactNode
  path?: string
  children?: AppRoute[]
  index?: boolean
  meta?: MetaProps
}