import type { PropState } from './types'
import React, { useEffect, useRef } from 'react'
import { useImmer } from 'use-immer'
import classNames from 'classnames'
import styles from './index.module.less'

const Dnd: React.FC<Partial<PropState>> = props => {
  const {
    x = 0,
    y = 0,
    z = 'auto',
    w = 200,
    h = 28,
    minW = 28,
    minH = 28,
    handlers = ['n', 'e', 's', 'w', 'ne', 'nw', 'se', 'sw'],
    active = false,
    canDeactive = true,
    draggable = true,
    axis = 'both',
    grid = [1, 1],
    parent = false,
    children,
    onActivated,
    onDeactivated,
    onResizing,
    onResizeStop,
    onDraging,
    onDragStop
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
    parentW: 10000,
    parentH: 10000,
    mouseX: 0,
    mouseY: 0,
    lastMouseX: 0,
    lastMouseY: 0,
    mouseOffX: 0,
    mouseOffY: 0,
    elmX: 0,
    elmY: 0,
    elmW: 0,
    elmH: 0
  })

  useEffect(() => {
    setDndData(draft => {
      draft.enabled = active
    })
  }, [active])

  useEffect(() => {
    setDndData(draft => {
      draft.left = x
      draft.elmX = x
    })
  }, [x])

  useEffect(() => {
    setDndData(draft => {
      draft.top = y
      draft.elmY = y
    })
  }, [y])

  useEffect(() => {
    setDndData(draft => {
      draft.zIndex = z
    })
  }, [z])

  useEffect(() => {
    setDndData(draft => {
      draft.width = w
      draft.elmW = w
    })
  }, [w])

  useEffect(() => {
    setDndData(draft => {
      draft.height = h
      draft.elmH = h
    })
  }, [h])

  useEffect(() => {
    const container = document.querySelector('.dnd-container') || document.documentElement
    container.addEventListener('mousedown', handleMousedown, false)
    container.addEventListener('mousemove', handleMousemove, false)
    container.addEventListener('mouseup', handleMouseup, false)

    const elmX = dndRef.current?.offsetLeft!
    const elmY = dndRef.current?.offsetTop!
    const elmW = dndRef.current?.clientWidth! || dndRef.current?.offsetWidth!
    const elmH = dndRef.current?.clientHeight! || dndRef.current?.offsetHeight!
    setDndData(draft => {
      draft.elmX = elmX
      draft.elmY = elmY
      draft.elmW = elmW
      draft.elmH = elmH
    })

    reviewDimensions()

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

  const reviewDimensions = () => {
    if (minW > w) {
      setDndData(draft => {
        draft.width = minW
      })
    }

    if (minH > h) {
      setDndData(draft => {
        draft.height = minH
      })
    }

    if (parent) {
      const parentW = dndRef.current?.parentElement?.clientWidth!
      const parentH = dndRef.current?.parentElement?.clientHeight!

      setDndData(draft => {
        draft.parentW = parentW
        draft.parentH = parentH
      })

      if (w > parentW) {
        setDndData(draft => {
          draft.width = parentW
        })
      }

      if (h > parentH) {
        setDndData(draft => {
          draft.height = parentH
        })
      }

      if (x + w > parentW) {
        setDndData(draft => {
          draft.width = parentW - x
        })
      }

      if (y + h > parentH) {
        setDndData(draft => {
          draft.height = parentH - y
        })
      }

      setDndData(draft => {
        draft.elmW = draft.width
        draft.elmH = draft.height
      })
    }

    onResizing && onResizing(dndData.left, dndData.top, dndData.width, dndData.height)
  }

  const handleActivated = (e: React.MouseEvent) => {
    const target = e.target

    if (dndRef.current?.contains(target as Node)) {
      e.stopPropagation()
      e.preventDefault()

      reviewDimensions()

      if (!dndData.enabled) {
        setDndData(draft => {
          draft.enabled = true
        })
        onActivated && onActivated()
      }

      if (draggable) {
        setDndData(draft => {
          draft.dragging = true
        })
      }
    }
  }

  const handleResizeStart = (e: React.MouseEvent, handler: string) => {
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

    const target = e.target! as HTMLElement
    const regex = new RegExp('handler-([nesw]{1, 2})', '')
    // 点击在当前组件外，取消active状态
    if (!dndRef.current?.contains(target) && !regex.test(target.className)) {
      if (dndData.enabled) {
        if (canDeactive) {
          setDndData(draft => {
            draft.enabled = false
          })
          onDeactivated && onDeactivated()
        }
      }
    }
  }

  const handleMousemove = (e: any) => {
    const lastMouseX = dndData.lastMouseX
    const lastMouseY = dndData.lastMouseY
    const mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft
    const mouseY = e.pageY || e.clientY + document.documentElement.scrollTop

    let diffX = mouseX - lastMouseX + dndData.mouseOffX
    let diffY = mouseY - lastMouseY + dndData.mouseOffY

    setDndData(draft => {
      draft.mouseX = mouseX
      draft.mouseY = mouseY
      draft.lastMouseX = mouseX
      draft.lastMouseY = mouseY
      draft.mouseOffX = 0
      draft.mouseOffY = 0
    })

    const dX = diffX
    const dY = diffY

    if (dndData.resizing) {
      if (dndData.handler.includes('n')) {
        if (dndData.elmH - dY < minH) {
          const mouseOffY = dY - (diffY = dndData.elmH - minH)
          setDndData(draft => {
            draft.mouseOffY = mouseOffY
          })
        } else if (parent && dndData.elmY + dY < 0) {
          const mouseOffY = dY - (diffY = -dndData.elmY)
          setDndData(draft => {
            draft.mouseOffY = mouseOffY
          })
        }

        setDndData(draft => {
          draft.elmY += diffY
          draft.elmH -= diffY
        })
      }

      if (dndData.handler.includes('e')) {
        if (dndData.elmW + dX < minW) {
          const mouseOffX = dX - (diffX = minW - dndData.elmW)
          setDndData(draft => {
            draft.mouseOffX = mouseOffX
          })
        } else if (parent && dndData.elmX + dndData.elmW + dX > dndData.parentW) {
          const mouseOffX = dX - (diffX = dndData.parentW - dndData.elmX - dndData.elmW)
          setDndData(draft => {
            draft.mouseOffX = mouseOffX
          })
        }

        setDndData(draft => {
          draft.elmW += diffX
        })
      }

      if (dndData.handler.includes('s')) {
        if (dndData.elmH + dY < minH) {
          const mouseOffY = dY - (diffY = minH - dndData.elmH)
          setDndData(draft => {
            draft.mouseOffY = mouseOffY
          })
        } else if (parent && dndData.elmY + dndData.elmH + dY > dndData.parentH) {
          const mouseOffY = dY - (diffY = dndData.parentH - dndData.elmY - dndData.elmH)
          setDndData(draft => {
            draft.mouseOffY = mouseOffY
          })
        }

        setDndData(draft => {
          draft.elmH += diffY
        })
      }

      if (dndData.handler.includes('w')) {
        if (dndData.elmW - dX < minW) {
          const mouseOffX = dX - (diffX = dndData.elmW - minW)
          setDndData(draft => {
            draft.mouseOffX = mouseOffX
          })
        } else if (parent && dndData.elmX + dX < 0) {
          const mouseOffX = dX - (diffX = -dndData.elmX)
          setDndData(draft => {
            draft.mouseOffX = mouseOffX
          })
        }

        setDndData(draft => {
          draft.elmX += diffX
          draft.elmW -= diffX
        })
      }

      const left = Math.round(dndData.elmX / grid[0]) * grid[0]
      const top = Math.round(dndData.elmY / grid[1]) * grid[1]
      const width = Math.round(dndData.elmW / grid[0]) * grid[0]
      const height = Math.round(dndData.elmH / grid[1]) * grid[1]

      setDndData(draft => {
        draft.left = left
        draft.top = top
        draft.width = width
        draft.height = height
      })

      onResizing && onResizing(left, top, width, height)
    } else if (dndData.dragging) {
      if (parent) {
        if (dndData.elmX + dX < 0) {
          const mouseOffX = dX - (diffX = -dndData.elmX)
          setDndData(draft => {
            draft.mouseOffX = mouseOffX
          })
        } else if (dndData.elmX + dndData.elmW + dX > dndData.parentW) {
          const mouseOffX = dX - (diffX = dndData.parentW - dndData.elmX - dndData.elmW)
          setDndData(draft => {
            draft.mouseOffX = mouseOffX
          })
        }

        if (dndData.elmY + dY < 0) {
          const mouseOffY = dY - (diffY = -dndData.elmY)
          setDndData(draft => {
            draft.mouseOffY = mouseOffY
          })
        } else if (dndData.elmY + dndData.elmH + dY > dndData.parentH) {
          const mouseOffY = dY - (diffY = dndData.parentH - dndData.elmY - dndData.elmH)
          setDndData(draft => {
            draft.mouseOffY = mouseOffY
          })
        }
      }

      setDndData(draft => {
        draft.elmX += diffX
        draft.elmY += diffY
      })

      if (axis === 'x' || axis === 'both') {
        // 四舍五入取得当前所在格子数 * 每个格子的单位像素，保证每一个点子在格子上
        const left = Math.round(dndData.elmX / grid[0]) * grid[0]
        setDndData(draft => {
          draft.left = left
        })
      }
      if (axis === 'y' || axis === 'both') {
        const top = Math.round(dndData.elmY / grid[1]) * grid[1]
        setDndData(draft => {
          draft.top = top
        })
      }

      onDraging && onDraging(dndData.left, dndData.top)
    }
  }

  const handleMouseup = () => {
    if (dndData.resizing) {
      setDndData(draft => {
        draft.resizing = false
      })
      onResizeStop && onResizeStop(dndData.left, dndData.top, dndData.width, dndData.height)
    }

    if (dndData.dragging) {
      setDndData(draft => {
        draft.dragging = false
      })
      onDragStop && onDragStop(dndData.left, dndData.top)
    }

    setDndData(draft => {
      draft.handler = ''
      draft.elmX = draft.left
      draft.elmY = draft.top
    })
  }

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
          onMouseDown={e => handleResizeStart(e, item)}
        />
      ))}
      {children}
    </div>
  )
}

export default Dnd
