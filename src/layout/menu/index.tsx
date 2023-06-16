import type { MenuProps } from 'antd'
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Spin } from 'antd'
import { BasicMenu } from '@/components/Menu'
import * as Icons from '@ant-design/icons'
import { getAsyncMenus } from '@/router/menus'
import { AppMenu } from '@/router/types'
import { setMenuList } from '@/stores/modules/menu/action'
import { setBreadcrumbs } from '@/stores/modules/breadcrumb/action'

type MenuItem = Required<MenuProps>['items'][number]

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => {
  return {
    label,
    key,
    icon,
    children,
    type
  } as MenuItem
}

const LayoutMenu = (props: any) => {
  const { pathname } = useLocation()
  const [loading, setLoading] = useState(false)
  const [menuList, setMenuList] = useState<AppMenu[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])

  const { setMenuList: setMenuListAction } = props

  useEffect(() => {
    setSelectedKeys([pathname])
  }, [pathname])

  const customIcons: { [key: string]: any } = Icons
  // const addIcon = (name?: string) => {
  //   if (!name) return null
  //   return React.createElement(customIcons[name])
  // }

  const getMenuItem = (data: AppMenu[], list: MenuItem[] = []) => {
    data.forEach((item: AppMenu) => {
      if (!item?.children?.length) {
        return list.push(getItem(item.name, item.path))
      }
      list.push(getItem(item.name, item.path, null, getMenuItem(item.children)))
    })
    return list
  }

  const getMenuList = async () => {
    setLoading(true)
    try {
      const menus = await getAsyncMenus()
      setMenuList(menus)
      setMenuListAction(menus)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMenuList()
  }, [])

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
        {/* <Menu
          theme='dark'
          mode='inline'
          triggerSubMenuAction='click'
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          items={menuList}
          onClick={handleMenuClick}
          onOpenChange={handleOpenChange}
        /> */}
        <BasicMenu items={menuList} />
      </Spin>
    </div>
  )
}

const mapStateToProps = (state: any) => state.menu
const mapDispatchToProps = { setMenuList, setBreadcrumbs }

export default connect(mapStateToProps, mapDispatchToProps)(LayoutMenu)