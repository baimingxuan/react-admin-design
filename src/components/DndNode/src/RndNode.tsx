import { FC, ReactElement, useState } from 'react'
import { Rnd } from 'react-rnd'

type handlerType = 'top' | 'right' | 'bottom' | 'left' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'

interface PropState {
  element: {
    x: number
    y: number
    z?: number | 'auto'
    w: number
    h: number
    minW: number
    minH: number
    active: boolean
    parent: boolean
  }
  handlers: Array<handlerType>
  children?: ReactElement
}

const CustomResizeHandler: FC = () => {
  return (
    <div className='flex-center' style={{ height: '100%' }}>
      <div
        style={{
          width: '8px',
          height: '8px',
          border: '1px solid #1890ff',
          borderRadius: '50%',
          background: '#fff'
        }}
      />
    </div>
  )
}

const RndNode: FC<PropState> = props => {
  const { element, children } = props
  return (
    <Rnd
      default={{ x: element.x, y: element.y, width: element.w, height: element.h }}
      minWidth={100}
      minHeight={24}
      resizeHandleComponent={{ bottomRight: <CustomResizeHandler /> }}
    >
      {children}
    </Rnd>
  )
}

export default RndNode
