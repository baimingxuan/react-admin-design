import type { MenuProps } from 'antd'
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, Spin } from 'antd'
import { getAsyncMenus } from '@/router/menus'

type MenuItem = Required<MenuProps>['items'][number]

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

const LayoutMenu = (props: any) => {
  const { pathname } = useLocation()
  const [loading, setLoading] = useState(false)
  const [menuList, setMenuList] = useState<MenuItem[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])

  useEffect(() => {
    setSelectedKeys([pathname])
  }, [pathname])

  const getMenuList = async () => {
    setLoading(true)
    try {
      const menus = await getAsyncMenus()
    } finally {
      setLoading(false)
    }
  }

  const handleOpenChange: MenuProps['onOpenChange'] = (keys: string[]) => {
    if (keys.length === 0 || keys.length === 1) return setOpenKeys(keys)
    const latestKey = keys[keys.length - 1]
		if (latestKey.includes(keys[0])) return setOpenKeys(keys)
		setOpenKeys([latestKey])
  }

  const navigate = useNavigate()
  const handleMenuClick: MenuProps['onClick'] = ({ key }: { key: string }) => {
		navigate(key)
	};

  return (
    <div className='layout_menu'>
      <Spin spinning={loading} tip='Loading...'>
        <Menu
          theme='dark'
          mode='inline'
          triggerSubMenuAction='click'
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          items={menuList}
          onClick={handleMenuClick}
          onOpenChange={handleOpenChange}
        />
      </Spin>
    </div>
  )
}

export default LayoutMenu