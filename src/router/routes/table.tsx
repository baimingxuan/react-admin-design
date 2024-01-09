import { lazy } from '@loadable/component'
import type { RouteObject } from '../types'
import { LayoutGuard } from '../guard'
import { LazyLoad } from '@/components/LazyLoad'

// table module page
const TableRoute: RouteObject = {
  path: '/table',
  name: 'Table',
  element: <LayoutGuard />,
  meta: {
    title: '表格',
    icon: 'table',
    orderNo: 3
  },
  children: [
    {
      path: 'table-basic',
      name: 'TableBasic',
      element: LazyLoad(lazy(() => import('@/views/table/table-basic'))),
      meta: {
        title: '基础表格',
        key: 'tableBasic'
      }
    },
    {
      path: 'table-edit-row',
      name: 'TableEditRow',
      element: LazyLoad(lazy(() => import('@/views/table/table-edit-row'))),
      meta: {
        title: '可编辑行表格',
        key: 'tableEditRow'
      }
    }
  ]
}

export default TableRoute
