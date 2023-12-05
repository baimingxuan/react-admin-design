import { useState, useEffect } from 'react'
import { Breadcrumb } from 'antd'
import { useLocation, matchRoutes } from 'react-router-dom'
import { useAppSelector } from '@/stores'
import SvgIcon from '@/components/SvgIcon'

export default function LayoutBreadcrumb() {
  const [breadcrumbs, setBreadcrumbs] = useState<any[]>([])
  const { pathname } = useLocation()
  const getMenuList = useAppSelector(state => state.menu.menuList)

  useEffect(() => {
    const matchRouteList = matchRoutes(getMenuList, pathname) || []
    const breadcrumbList = matchRouteList.map((item: any) => {
      const { name, icon = '' } = item?.route
      return {
        title: (
          <>
            {icon && <SvgIcon name={icon} style={{ marginRight: 8 }} />}
            <span>{name}</span>
          </>
        )
      }
    })
    setBreadcrumbs(breadcrumbList)
  }, [pathname])

  return (
    <div className='flex-center-v' style={{ padding: '0 16px' }}>
      <Breadcrumb items={breadcrumbs} />
    </div>
  )
}
