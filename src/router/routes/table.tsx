import { AppRoute } from '../types'
import { BasicLayout } from '../../layout'
import Home from '../../views/home'

// table module page
const TableRoute: AppRoute = {
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
            element: <Home />,
            meta: {
                title: '基础表格'
            }
        },
        {
            path: 'table-edit-row',
            element: <Home />,
            meta: {
                title: '可编辑行表格'
            }
        }
    ]
}

export default TableRoute