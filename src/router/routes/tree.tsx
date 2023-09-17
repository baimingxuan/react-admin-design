import { RouteObject } from '../types'
import { BasicLayout } from '../../layout'
import Home from '../../views/home'
import AntdTree from '@/views/tree/antd-tree'
import OrgTree from '@/views/tree/org-tree'

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
            element: <OrgTree />,
            meta: {
                title: '组织树',
                key: 'orgTree'
            }
        },
        {
            path: 'antd-tree',
            element: <AntdTree />,
            meta: {
                title: '控件树',
                key: 'antdTree'
            }
        }
    ]
}

export default TreeRoute