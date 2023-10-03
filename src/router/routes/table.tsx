import { RouteObject } from '../types'
import { BasicLayout } from '../../layout'
import TableBasic from '@/views/table/table-basic'
import TableEditRow from '@/views/table/table-edit-row'

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
            element: <TableBasic />,
            meta: {
                title: '基础表格',
                key: 'tableBasic'
            }
        },
        {
            path: 'table-edit-row',
            element: <TableEditRow />,
            meta: {
                title: '可编辑行表格',
                key: 'tableEditRow'
            }
        }
    ]
}

export default TableRoute