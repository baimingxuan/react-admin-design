import { ReactNode } from 'react'

type handlerType = 'n' | 'e' | 's' | 'w' | 'nw' | 'ne' | 'se' | 'sw'

export interface PropState {
  x: number
  y: number
  z: number | 'auto'
  w: number
  h: number
  minW: number
  minH: number
  handlers: Array<handlerType>
  active: boolean
  draggable: boolean
  parent: boolean
  children: ReactNode
}
