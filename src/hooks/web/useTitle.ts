import type { RootState } from '@/stores'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useTitle as usePageTitle } from 'ahooks'
import { searchRoute } from '@/utils'

// 监听页面变化和动态改变网站标题
export function useTitle() {
  const [pageTitle, setPageTitle] = useState('react-admin-design')
  const { pathname } = useLocation()
  const menuList = useSelector((state: RootState) => state.menu.menuList)
  const currRoute = searchRoute(pathname, menuList)

  useEffect(() => {
    setPageTitle(currRoute?.name)
  }, [pathname])

  usePageTitle(pageTitle)

}
