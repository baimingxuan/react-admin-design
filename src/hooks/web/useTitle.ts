import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTitle as usePageTitle } from 'ahooks'
import { searchRoute } from '@/utils'
import { useAppSelector } from '@/stores'

// 监听页面变化和动态改变网站标题
export function useTitle() {
  const [pageTitle, setPageTitle] = useState('react-admin-design')
  const { pathname } = useLocation()
  const { menuList } = useAppSelector(state => state.menu)
  const currRoute = searchRoute(pathname, menuList)

  useEffect(() => {
    setPageTitle(currRoute?.name)
  }, [pathname])

  usePageTitle(pageTitle)

}
