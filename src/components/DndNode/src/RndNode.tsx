import type { FC, ReactElement } from 'react'
import type { Position, DraggableData } from 'react-rnd'
import { useEffect, useState, useId } from 'react'
import { useImmer } from 'use-immer'
import { Rnd } from 'react-rnd'
import classNames from 'classnames'
import styles from './compo.module.less'

enum handlerEnum {
  n = 'top',
  e = 'right',
  s = 'bottom',
  w = 'left',
  nw = 'topLeft',
  ne = 'topRight',
  se = 'bottomRight',
  sw = 'bottomLeft'
}
type handlerType = 'n' | 'e' | 's' | 'w' | 'nw' | 'ne' | 'se' | 'sw'

interface ElementState {
  x: number
  y: number
  z?: number | 'auto'
  w: number
  h: number
  active: boolean
}

interface PropState {
  element: ElementState
  handlers?: Array<handlerType>
  children?: ReactElement
  onChange?: (element: ElementState) => void
}

interface nodeDataState {
  x: number
  y: number
  width: number
  height: number
}

const RndNode: FC<PropState> = props => {
  const { element, children, handlers = ['n', 'e', 's', 'w', 'ne', 'nw', 'se', 'sw'], onChange } = props
  const { x = 0, y = 0, w: width = 100, h: height = 28 } = element

  const rndNodeId = `rndNode_${useId()}`
  const [nodeData, setNodeData] = useImmer<nodeDataState>({ x, y, width, height })
  const [active, setActive] = useState(element.active)

  useEffect(() => {
    setNodeData(draft => {
      draft.x = x
      draft.y = y
      draft.width = width
      draft.height = height
    })
  }, [x, y, width, height])

  useEffect(() => {
    setActive(element.active)
  }, [element.active])

  useEffect(() => {
    onChange?.({ ...element, ...nodeData, active })
  }, [active, nodeData])

  useEffect(() => {
    const container = document.querySelector('.rnd-container') || document.documentElement
    container.addEventListener('mousedown', handleMousedown, false)

    return () => {
      container.removeEventListener('mousedown', handleMousedown, false)
    }
  })

  const handlerClasses = handlers.reduce(
    (acc, cur) => {
      acc[handlerEnum[cur]] = `${styles['handler']} ${styles[`handler-${cur}`]}`
      return acc
    },
    {} as { [value in handlerEnum]: string }
  )

  const enableHandler = handlers.reduce(
    (acc, cur) => {
      acc[handlerEnum[cur]] = true
      return acc
    },
    {} as { [value in handlerEnum]: boolean }
  )

  const handleMousedown = (e: Event) => {
    const target = e.target! as HTMLElement
    const rndNodeRef = document.getElementById(rndNodeId)

    if (rndNodeRef?.contains(target)) {
      !active && setActive(true)
    } else {
      active && setActive(false)
    }
  }

  const handleResize = (_e: any, _direction: any, _ref: any, _delta: any, position: Position) => {}

  const handleResizeStop = (_e: any, _direction: any, _ref: any, _delta: any, position: Position) => {}

  const handleDragStop = (_e: any, data: DraggableData) => {}

  return (
    <Rnd
      id={rndNodeId}
      default={{ ...nodeData }}
      minWidth={100}
      minHeight={24}
      bounds='parent'
      enableResizing={{ ...enableHandler }}
      resizeHandleClasses={{ ...handlerClasses }}
      className={classNames(styles['rnd-node-wrapper'], { [styles['active']]: active })}
      onResize={handleResize}
      onResizeStop={handleResizeStop}
      onDragStop={handleDragStop}
    >
      {children}
    </Rnd>
  )
}

export default RndNode
