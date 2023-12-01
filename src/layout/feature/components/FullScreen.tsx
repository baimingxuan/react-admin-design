import { Tooltip } from 'antd'
import { useFullscreen } from 'ahooks'
import SvgIcon from '@/components/SvgIcon'

export default function FullScreen() {
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body)

  return (
    <Tooltip title={isFullscreen ? '退出全屏' : '进入全屏'} placement='bottom' mouseEnterDelay={0.5}>
      <span className='icon-btn' onClick={toggleFullscreen}>
        {!isFullscreen ? <SvgIcon name='screen-full' size={20} /> : <SvgIcon name='screen-normal' size={20} />}
      </span>
    </Tooltip>
  )
}
