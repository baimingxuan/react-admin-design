import { ReactNode } from 'react'
import { LoaderFunction } from 'react-router-dom'

export interface MetaProps {
  title: string
  key?: string
  icon?: string
  keepAlive?: boolean
  orderNo?: number
  hideMenu?: boolean
  hideChildrenInMenu?: boolean
}

export interface RouteObject {
  id?: string
  loader?: LoaderFunction
  element?: ReactNode
  path?: string
  children?: RouteObject[]
  index?: false
  meta?: MetaProps
}

export interface AppMenu {
  name: string
  path: string
  children?: AppMenu[]
  disabled?: boolean
  icon?: string
  affix?: boolean
  orderNo?: number
  hideMenu?: boolean
  hideChildrenInMenu?: boolean
  hideBreadcrumb?: boolean
}
