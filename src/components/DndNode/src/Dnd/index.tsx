import type { FC, MouseEvent } from 'react'
import type { PropState } from './types'
import { useEffect, useRef } from 'react'
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
    active = false,
    canDeactive = true,
    activated,
    deactivated
  } = props

  const dndRef = useRef<HTMLDivElement>(null)
  const [dndData, setDndData] = useImmer({
    top: y,
    left: x,
    zIndex: z,
    width: w,
    height: h,
    resizing: false,
    dragging: false,
    enabled: active,
    handler: '',
    mouseX: 0,
    mouseY: 0,
    lastMouseX: 0,
    lastMouseY: 0
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

  useEffect(() => {
    const container = document.querySelector('.dnd-container') || document.documentElement
    container.addEventListener('mousedown', handleMousedown, false)
    container.addEventListener('mousemove', handleMousemove, false)
    container.addEventListener('mouseup', handleMouseup, false)

    return () => {
      container.removeEventListener('mousedown', handleMousedown, false)
      container.removeEventListener('mousemove', handleMousemove, false)
      container.removeEventListener('mouseup', handleMouseup, false)
    }
  }, [])

  const getDndStyle = () => ({
    top: `${dndData.top}px`,
    left: `${dndData.left}px`,
    zIndex: dndData.zIndex,
    width: `${dndData.width}px`,
    height: `${dndData.height}px`
  })

  const handleActivated = (e: MouseEvent) => {
    const target = e.target

    if (dndRef.current?.contains(target as Node)) {
      e.stopPropagation()
      e.preventDefault()

      if (!dndData.enabled) {
        setDndData(draft => {
          draft.enabled = true
        })
        activated && activated()
      }

      if (draggable) {
        setDndData(draft => {
          draft.dragging = true
        })
      }
    }
  }

  const handleResize = (e: MouseEvent, handler: string) => {
    e.stopPropagation()
    e.preventDefault()

    setDndData(draft => {
      draft.resizing = true
      draft.handler = handler
    })
  }

  const handleMousedown = (e: any) => {
    const mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft
    const mouseY = e.pageY || e.clientY + document.documentElement.scrollTop

    setDndData(draft => {
      draft.mouseX = mouseX
      draft.mouseY = mouseY
      draft.lastMouseX = mouseX
      draft.lastMouseY = mouseY
    })

    const target = e.target || e.srcElement
    const regex = new RegExp('handler-([nesw]{1, 2})', '')
    // 点击在当前组件外，取消active状态
    if (!dndRef.current?.contains(target) && !regex.test(target.className)) {
      if (dndData.enabled) {
        if (canDeactive) {
          setDndData(draft => {
            draft.enabled = false
          })
          deactivated && deactivated()
        }
      }
    }
  }

  const handleMousemove = (e: Event) => {}

  const handleMouseup = (e: Event) => {}

  return (
    <div
      ref={dndRef}
      className={classNames(styles['dnd-wrapper'], { [styles['draggable']]: draggable, [styles['active']]: active })}
      style={{ ...getDndStyle() }}
      onMouseDown={e => handleActivated(e)}
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
