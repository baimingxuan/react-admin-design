import { Tooltip } from 'antd'
import SvgIcon from '@/components/SvgIcon'

export default function DocLink() {
  return (
    <Tooltip title='文档' placement='bottom' mouseEnterDelay={0.5}>
      <span className='icon-btn'>
        <SvgIcon name='document' size={20} />
      </span>
    </Tooltip>
  )
}
