import type { MenuProps } from 'antd'
import { Space, Dropdown } from 'antd'
import { LockOutlined, PoweroffOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { getAuthCache, clearAuthCache } from '@/utils/auth'
import { TOKEN_KEY } from '@/enums/cacheEnum'
import { useAppDispatch, useAppSelector } from '@/stores'
import { useMessage } from '@/hooks/web/useMessage'
import { logoutApi } from '@/api'
import { resetState } from '@/stores/modules/user'
import headerImg from '@/assets/images/avatar.jpeg'

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

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const { token } = useAppSelector(state => state.user)
  const getToken = (): string => {
    return token || getAuthCache<string>(TOKEN_KEY)
  }

  const handleLock = () => {}

  const handleLogout = () => {
    const { createConfirm } = useMessage()

    createConfirm({
      iconType: 'warning',
      title: <span>温馨提醒</span>,
      content: <span>是否确认退出系统?</span>,
      onOk: async () => {
        await logoutAction(true)
      }
    })
  }

  const logoutAction = async (goLogin = false) => {
    if (getToken()) {
      try {
        await logoutApi()
      } catch (error) {
        const { createMessage } = useMessage()
        createMessage.error('注销失败!')
      }
    }
    dispatch(resetState())
    clearAuthCache()
    goLogin && navigate('/login')
  }

  return (
    <Dropdown menu={{ items, onClick }} placement='bottomRight' arrow>
      <span className='flex-center' style={{ cursor: 'pointer' }}>
        <img
          src={headerImg}
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%'
          }}
          alt=''
        />
      </span>
    </Dropdown>
  )
}
