import { useState } from 'react'
import { Tooltip } from 'antd'
import { useFullScreenHandle } from 'react-full-screen'
import SvgIcon from '@/components/SvgIcon'

export default function FullScreen() {
  const [fullScreen, setFullScreen] = useState(false)
  const handle = useFullScreenHandle()
  const toggle = () => {
    if (!fullScreen) {
      setFullScreen(true)
      handle.enter()
    } else {
      setFullScreen(false)
      handle.exit()
    }
  }

  return (
    <Tooltip
      title={fullScreen ? '退出全屏' : '全屏'}
      placement='bottom'
      mouseEnterDelay={0.5}
    >
      <span className='icon-btn' onClick={toggle}>
        {
          !fullScreen ? (
            <SvgIcon name='screen-full' size={20} />
          ) : (
            <SvgIcon name='screen-normal' size={20} />
          )
        }
      </span>
    </Tooltip>
  )
}