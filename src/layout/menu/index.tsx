import type { MenuProps } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Spin } from 'antd'

type MenuItem = Required<MenuProps>['items'][number]

const LayoutMenu = (props: any) => {
  const [loading, setLoading] = useState(false)
  const [menuList, setMenuList] = useState<MenuItem[]>([])

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
          onClick={handleMenuClick}
        />
      </Spin>
    </div>
  )
}

export default LayoutMenu