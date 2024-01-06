import { Tooltip } from 'antd'
import { openWindow } from '@/utils'
import SvgIcon from '@/components/SvgIcon'

export default function GithubLink() {
  function openGithub() {
    openWindow('https://github.com/baimingxuan/react-admin-design')
  }

  return (
    <Tooltip title='github' placement='bottom' mouseEnterDelay={0.5}>
      <span className='icon-btn' onClick={openGithub}>
        <SvgIcon name='github' size={20} />
      </span>
    </Tooltip>
  )
}
