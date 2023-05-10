import { RouteObject } from '../types'
import { BasicLayout } from '../../layout'
import Home from '../../views/home'

// tree module page
const TreeRoute: RouteObject = {
    path: '/tree',
    element: <BasicLayout />,
    meta: {
        title: '树形结构',
        icon: 'tree',
        orderNo: 9
    },
    children: [
        {
            path: 'org-tree',
            element: <Home />,
            meta: {
                title: '组织树'
            }
        },
        {
            path: 'antd-tree',
            element: <Home />,
            meta: {
                title: '控件树'
            }
        }
    ]
}

export default TreeRoute