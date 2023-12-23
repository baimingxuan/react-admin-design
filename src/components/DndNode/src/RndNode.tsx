import { FC, ReactElement, useEffect, useState, useRef } from 'react'
import { Rnd } from 'react-rnd'
import classNames from 'classnames'
import styles from './compo.module.less'

type handlerType = 'top' | 'right' | 'bottom' | 'left' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'

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
}

const CustomResizeHandler: FC = () => {
  return (
    <div className='flex-center handler-box'>
      <div className='circle' />
    </div>
  )
}

const RndNode: FC<PropState> = props => {
  const {
    element,
    children,
    handlers = ['top', 'right', 'bottom', 'left', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight']
  } = props

  const { x = 0, y = 0, w: width = 100, h: height = 28 } = element

  const rndNodeRef = useRef(null)
  const [active, setActive] = useState(element.active)

  const resizeHandler = handlers.reduce(
    (acc, cur) => {
      acc[cur] = <CustomResizeHandler />
      return acc
    },
    {} as { [key in handlerType]: ReactElement }
  )

  const handleMousedown = (e: any) => {
    // const target = e.target! as HTMLElement
    // const regex = new RegExp('handler-([nesw]{1, 2})', '')
    // 点击在当前组件外，取消active状态
    console.log(rndNodeRef.current)
    // if (!rndNodeRef.current?.contains(target) && !regex.test(target.className)) {
    //   if (active) {
    //     setActive(false)
    //   }
    // }
    setActive(true)
  }

  const handleMouseup = () => {
    setActive(false)
  }

  useEffect(() => {
    setActive(element.active)
  }, [element.active])

  useEffect(() => {
    const container = document.querySelector('.dnd-container') || document.documentElement
    container.addEventListener('mousedown', handleMousedown, false)
  })

  return (
    <Rnd
      ref={rndNodeRef}
      default={{ x, y, width, height }}
      minWidth={100}
      minHeight={24}
      bounds='parent'
      resizeHandleComponent={{ ...resizeHandler }}
      className={classNames(styles['rnd-node-wrapper'], { [styles['active']]: active })}
      onMouseDown={e => handleMousedown(e)}
      onMouseUp={() => handleMouseup()}
    >
      {children}
    </Rnd>
  )
}

export default RndNode
