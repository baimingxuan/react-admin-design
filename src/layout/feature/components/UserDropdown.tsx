import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'
import { LockOutlined, PoweroffOutlined } from '@ant-design/icons'
import headerImg from '@/assets/images/avatar.png'

export default function UserDropdown() {

  const items: MenuProps['items'] = [
    {
      key: 'lock',
      label: (
        <span className='flex-center-v'>
          <LockOutlined rev={undefined} />
          <span style={{marginLeft: '4px'}}>锁定屏幕</span>
        </span>
      )
    },
    {
      key: 'logout',
      label: (
        <span className='flex-center-v'>
          <PoweroffOutlined rev={undefined} />
          <span style={{marginLeft: '4px'}}>退出登录</span>
        </span>
      )
    }
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'lock':
        handleLock()
        break
      case 'logout':
        handleLogout()
        break
    }
  }

  const handleLock = () => {}

  const handleLogout = () => {}

  return (
    <Dropdown menu={{ items, onClick }} placement='bottomRight' arrow>
      <span
        className='flex-center'
        style={{cursor: 'pointer'}}
      >
        <img
          src={headerImg}
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%'
          }}
        />
      </span>
    </Dropdown>
  )
}