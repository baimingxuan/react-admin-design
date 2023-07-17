import type { MenuProps } from 'antd'
import { Space, Dropdown } from 'antd'
import { LockOutlined, PoweroffOutlined } from '@ant-design/icons'
import headerImg from '@/assets/images/avatar.png'

export default function UserDropdown() {

  const items: MenuProps['items'] = [
    {
      key: 'lock',
      label: (
        <Space size={4}>
          <LockOutlined rev={undefined} />
          <span>锁定屏幕</span>
        </Space>
      )
    },
    {
      key: 'logout',
      label: (
        <Space size={4}>
          <PoweroffOutlined rev={undefined} />
          <span>退出登录</span>
        </Space>
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