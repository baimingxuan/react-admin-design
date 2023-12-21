import type { FC, MouseEvent } from 'react'
import type { PropState } from './types'
import { useEffect } from 'react'
import { useImmer } from 'use-immer'
import classNames from 'classnames'
import styles from './index.module.less'

const Dnd: FC<Partial<PropState>> = props => {
  const {
    x = 0,
    y = 0,
    z = 'auto',
    w = 200,
    h = 28,
    handlers = ['n', 'e', 's', 'w', 'ne', 'nw', 'se', 'sw'],
    children,
    draggable = true,
    active = false
  } = props

  const [dndData, setDndData] = useImmer({
    top: y,
    left: x,
    zIndex: z,
    width: w,
    height: h,
    resizing: false,
    dragging: false,
    enabled: active,
    handler: ''
  })

  useEffect(() => {
    setDndData(draft => {
      draft.enabled = active
    })
  }, [active])

  useEffect(() => {
    setDndData(draft => {
      draft.left = x
      draft.top = y
      draft.zIndex = z
      draft.width = w
      draft.height = h
    })
  }, [x, y, z, w, h])

  const getDndStyle = () => ({
    top: `${dndData.top}px`,
    left: `${dndData.left}px`,
    zIndex: dndData.zIndex,
    width: `${dndData.width}px`,
    height: `${dndData.height}px`
  })

  const handleMousedown = (e: MouseEvent) => {
    const target = e.target
  }

  const handleResize = (e: MouseEvent, handler: string) => {
    e.stopPropagation()
    e.preventDefault()

    setDndData(draft => {
      draft.resizing = true
      draft.handler = handler
    })
  }

  return (
    <div
      className={classNames(styles['dnd-wrapper'], { [styles['draggable']]: draggable, [styles['active']]: active })}
      style={{ ...getDndStyle() }}
      onMouseDown={e => handleMousedown(e)}
    >
      {handlers.map(item => (
        <div
          key={item}
          className={classNames(styles['dnd-handler'], styles[`handler-${item}`])}
          style={{ display: dndData.enabled ? 'block' : 'none' }}
          onMouseDown={e => handleResize(e, item)}
        />
      ))}
      {children}
    </div>
  )
}

export default Dnd
