import { lazy } from 'react'
import { RouteObject } from '../types'
import { BasicLayout } from '../../layout'
import lazyLoad from '../lazyLoad'

// excel module page
const ExcelRoute: RouteObject = {
  path: '/excel',
  element: <BasicLayout />,
  meta: {
    title: 'Excel',
    icon: 'excel',
    orderNo: 10
  },
  children: [
    {
      path: 'export-excel',
      element: lazyLoad(lazy(() => import('@/views/excel/export-excel'))),
      meta: {
        title: '导出Excel',
        key: 'exportExcel'
      }
    },
    {
      path: 'import-excel',
      element: lazyLoad(lazy(() => import('@/views/excel/import-excel'))),
      meta: {
        title: '导入Excel',
        key: 'importExcel'
      }
    }
  ]
}

export default ExcelRoute
