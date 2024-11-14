import { lazy } from '@loadable/component'
import type { RouteObject } from '../types'
import { LayoutGuard } from '../guard'
import { LazyLoad } from '@/components/LazyLoad'

// information module page
const TextEditorRoute: RouteObject = {
    path: '/user-list',
    name: 'UserList',
    element: <LayoutGuard />,
    meta: {
        title: '用户管理',
        icon: 'tree',
        orderNo: 4,
        hideChildrenInMenu: true
    },
    children: [
        {
            path: '',
            name: 'UserList',
            element: LazyLoad(lazy(() => import('@/views/user/user-list'))),
            meta: {
                title: '用户列表',
                key: 'user-list'
            }
        }
    ]
}

export default TextEditorRoute