import { lazy } from 'react'
import { RouteObject } from '../types'
import { BasicLayout } from '@/layout'
import lazyLoad from '../lazyLoad'

// table module page
const TableRoute: RouteObject = {
  path: '/table',
  element: <BasicLayout />,
  meta: {
    title: '表格',
    icon: 'table',
    orderNo: 3
  },
  children: [
    {
      path: 'table-basic',
      element: lazyLoad(lazy(() => import('@/views/table/table-basic'))),
      meta: {
        title: '基础表格',
        key: 'tableBasic'
      }
    },
    {
      path: 'table-edit-row',
      element: lazyLoad(lazy(() => import('@/views/table/table-edit-row'))),
      meta: {
        title: '可编辑行表格',
        key: 'tableEditRow'
      }
    }
  ]
}

export default TableRoute
