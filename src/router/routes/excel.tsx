import { lazy } from '@loadable/component'
import { RouteObject } from '../types'
import { LayoutGuard } from '../guard'
import { LazyLoad } from '@/components/LazyLoad'
import ExportExcel from '@/views/excel/export-excel'
import ImportExcel from '@/views/excel/import-excel'

// excel module page
const ExcelRoute: RouteObject = {
  path: '/excel',
  name: 'Excel',
  element: <LayoutGuard />,
  meta: {
    title: 'Excel',
    icon: 'excel',
    orderNo: 10
  },
  children: [
    {
      path: 'export-excel',
      name: 'ExportExcel',
      // element: <ExportExcel />,
      element: LazyLoad(lazy(() => import('@/views/excel/export-excel'))),
      meta: {
        title: '导出Excel',
        key: 'exportExcel'
      }
    },
    {
      path: 'import-excel',
      name: 'ImportExcel',
      // element: <ImportExcel />,
      element: LazyLoad(lazy(() => import('@/views/excel/import-excel'))),
      meta: {
        title: '导入Excel',
        key: 'importExcel'
      }
    }
  ]
}

export default ExcelRoute
