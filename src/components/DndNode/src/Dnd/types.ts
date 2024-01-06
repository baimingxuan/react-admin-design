import type { ReactNode } from 'react'

type handlerType = 'n' | 'e' | 's' | 'w' | 'ne' | 'nw' | 'se' | 'sw'
type axisType = 'x' | 'y' | 'both'

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
  canDeactive: boolean
  draggable: boolean
  axis: axisType
  grid: [number, number]
  parent: boolean
  children: ReactNode
  onActivated: () => void
  onDeactivated: () => void
  onResizing: (left: number, top: number, width: number, height: number) => void
  onResizeStop: (left: number, top: number, width: number, height: number) => void
  onDraging: (left: number, top: number) => void
  onDragStop: (left: number, top: number) => void
}
